package com.larsreimann.safeds.staticAnalysis.schema

import com.larsreimann.safeds.constant.hasSchemaKind
import com.larsreimann.safeds.emf.argumentsOrEmpty
import com.larsreimann.safeds.emf.assigneesOrEmpty
import com.larsreimann.safeds.emf.assignmentsOrEmpty
import com.larsreimann.safeds.emf.constraintStatementsOrEmpty
import com.larsreimann.safeds.emf.descendants
import com.larsreimann.safeds.emf.typeArgumentsOrEmpty
import com.larsreimann.safeds.safeDS.SdsAbstractAssignee
import com.larsreimann.safeds.safeDS.SdsAbstractNamedTypeDeclaration
import com.larsreimann.safeds.safeDS.SdsAbstractStatement
import com.larsreimann.safeds.safeDS.SdsArgument
import com.larsreimann.safeds.safeDS.SdsAssignment
import com.larsreimann.safeds.safeDS.SdsCall
import com.larsreimann.safeds.safeDS.SdsExpressionStatement
import com.larsreimann.safeds.safeDS.SdsFunction
import com.larsreimann.safeds.safeDS.SdsMemberAccess
import com.larsreimann.safeds.safeDS.SdsNamedType
import com.larsreimann.safeds.safeDS.SdsPlaceholder
import com.larsreimann.safeds.safeDS.SdsPredicate
import com.larsreimann.safeds.safeDS.SdsReference
import com.larsreimann.safeds.safeDS.SdsResult
import com.larsreimann.safeds.safeDS.SdsSchemaYield
import com.larsreimann.safeds.safeDS.SdsTypeParameter
import com.larsreimann.safeds.staticAnalysis.assignedOrNull
import com.larsreimann.safeds.staticAnalysis.callableOrNull
import com.larsreimann.safeds.staticAnalysis.linking.parameterOrNull
import com.larsreimann.safeds.staticAnalysis.linking.typeParameterOrNull
import com.larsreimann.safeds.utils.ExperimentalSdsApi
import com.larsreimann.safeds.validation.codes.ErrorCode
import org.eclipse.emf.ecore.EObject
import org.eclipse.xtext.naming.QualifiedName

fun inferSchema(
    statement: SdsAbstractStatement,
    pipelineContext: MutableMap<SchemaOwner, SchemaResult>,
): MutableMap<SchemaOwner, SchemaResult> {
    val mainFunCall: SdsCall = when (statement) {
        is SdsExpressionStatement -> statement.expression as? SdsCall ?: return mutableMapOf()
        is SdsAssignment -> statement.expression as? SdsCall ?: return mutableMapOf()
        else -> return mutableMapOf()
    }

    // for the chain of calls
    val (firstCaller, calls) = firstReceiverAndCallChain(mainFunCall)

    val pipelineContextMapped = pipelineContext.mapKeys {
        val schemaOwner = it.key as? SchemaOwner
        val schemaResult = it.value

        if (schemaOwner is SchemaOwner.Assignee && schemaOwner.assignee == firstCaller) {
            if (schemaResult !is SchemaResult.Schema) {
                return mutableMapOf() // there is no current schema
            } else {
                return@mapKeys SchemaOwner.CurrentCaller
            }
        }

        it.key
    }.toMutableMap()

    var schemaOwnerToTypeParameter: Map<SchemaOwner, SdsTypeParameter>? = null

    if (statement is SdsAssignment) {
        schemaOwnerToTypeParameter = getSchemaOwnerToTypeParameterMap(statement)

        if (schemaOwnerToTypeParameter.isEmpty()) {
            return mutableMapOf()
        }
    }

    var yieldedSchemasMap: Map<SdsTypeParameter, SchemaResult> = emptyMap()

    for (call in calls.reversed()) {
        val function = call.callableOrNull() as? SdsFunction ?: return mutableMapOf()
        val maybeResult = inferSchema(function, call, pipelineContextMapped)

        yieldedSchemasMap = when (maybeResult) {
            is SchemaResult.FunctionResult -> maybeResult.schemaResults
            else -> emptyMap()
        }

        if (yieldedSchemasMap.count() == 1) {
            val schemaResult = yieldedSchemasMap.toList().first().second
            pipelineContextMapped.put(SchemaOwner.CurrentCaller, schemaResult)
        }
    }

    // in case of expression statement
    if (schemaOwnerToTypeParameter == null) {
        return yieldedSchemasMap.mapKeys { SchemaOwner.TempOwner(it.key) }.toMutableMap()
    } else { // in case of assignment statement
        val ownerToSchemaMap = schemaOwnerToTypeParameter.mapValues {
            yieldedSchemasMap.getOrDefault(it.value, SchemaResult.NoSchema)
        }

        return ownerToSchemaMap.toMutableMap()
    }
}

@OptIn(ExperimentalSdsApi::class)
private fun inferSchema(
    function: SdsFunction,
    functionCall: SdsCall,
    pipelineContext: Map<SchemaOwner, SchemaResult>,
): SchemaResult {
    val parmArgPairs: List<ParmArgPairs> =
        functionCall.argumentsOrEmpty().mapNotNull {
            val param = it.parameterOrNull() ?: return@mapNotNull null
            ParmArgPairs.Parm_Arg_Pair(Pair(param, it))
        } +
            functionCall.typeArgumentsOrEmpty().mapNotNull {
                val typeParam = it.typeParameterOrNull() ?: return@mapNotNull null

                if (typeParam.hasSchemaKind()) {
                    return@mapNotNull null
                }
                ParmArgPairs.TypeParm_TypeArg_Pair(Pair(typeParam, it))
            }

    // Inside constraint block
    val predicateAssignments = function.constraintStatementsOrEmpty()
        .filterIsInstance<SdsAssignment>()

    val resolvedPredicateVars = resolvePredicateVars(
        predicateAssignments,
        pipelineContext,
        parmArgPairs,
    ) ?: return SchemaResult.UnComputable

    val yieldedTypeParameterToSchema = resolvedPredicateVars
        .mapNotNull {
            val schemaYield = it.key as? SdsSchemaYield
            val declaration = schemaYield?.type?.declaration

            val typeParameter = typeParameterWithSchemaOrNull(declaration)
                ?: return@mapNotNull null
            typeParameter to it.value
        }.toMap()

    return SchemaResult.FunctionResult(yieldedTypeParameterToSchema)
}

@OptIn(ExperimentalSdsApi::class)
internal fun inferSchema(
    predicate: SdsPredicate,
    valueResultStack: ArrayDeque<List<ArgResult>>,
): SchemaResult {
    val predicateAssignments = predicate.assignmentsOrEmpty()

    val resolvedPredicateVars = resolvePredicateVars(
        predicateAssignments,
        emptyMap(),
        emptyList(),
        valueResultStack,
    ) ?: return SchemaResult.UnComputable

    val schemaResult = resolvedPredicateVars
        .mapNotNull {
            val schemaYield = it.key as? SdsSchemaYield
            if (schemaYield == null) {
                return@mapNotNull null
            }
            it.value
        }.firstOrNull() ?: return SchemaResult.UnComputable

    return SchemaResult.PredicateResult(schemaResult)
}

private fun resolvePredicateVars(
    predicateAssignments: List<SdsAssignment>,
    pipelineContext: Map<SchemaOwner, SchemaResult>,
    parmArgPairs: List<ParmArgPairs>,
    valueResultStack: ArrayDeque<List<ArgResult>> = ArrayDeque(),
): MutableMap<SdsAbstractAssignee, SchemaResult>? {
    val resolvedPredicateVars: MutableMap<SdsAbstractAssignee, SchemaResult> = mutableMapOf()

    for (predicateAssignment in predicateAssignments) {
        // Only one result returned from a predicate
        val assignee = predicateAssignment.assigneesOrEmpty().firstOrNull()
            ?: return null

        val predicateCall = predicateAssignment.expression as? SdsCall
            ?: return null

        val predicate = predicateCall.callableOrNull() as? SdsPredicate ?: return null
        val maybeResult = inferSchema(
            predicate,
            predicateCall,
            pipelineContext,
            resolvedPredicateVars,
            parmArgPairs,
            valueResultStack,
        )

        val schemaResult = when (maybeResult) {
            is SchemaResult.PredicateResult -> maybeResult.schemaResult
            else -> SchemaResult.UnComputable
        }

        resolvedPredicateVars.put(assignee, schemaResult)
    }

    return resolvedPredicateVars
}

sealed interface SchemaOwner {
    object CurrentCaller : SchemaOwner
    class Assignee(val assignee: SdsAbstractAssignee) : SchemaOwner
    class TempOwner(val id: SdsTypeParameter) : SchemaOwner
}

sealed interface SchemaResult {
    object UnComputable : SchemaResult
    object NoSchema : SchemaResult
    class FunctionResult(val schemaResults: Map<SdsTypeParameter, SchemaResult>) : SchemaResult
    class PredicateResult(val schemaResult: SchemaResult) : SchemaResult
    class Schema(val schema: Map<String, QualifiedName>) : SchemaResult
    class Error(val msg: String, val argument: SdsArgument, val code: ErrorCode) : SchemaResult
}

// Helper functions --------------------------------------------------------------------------------

@OptIn(ExperimentalSdsApi::class)
private fun firstReceiverAndCallChain(call: SdsCall): Pair<SdsAbstractAssignee?, List<SdsCall>> {
    var calls: MutableList<SdsCall> = mutableListOf(call)
    var current: EObject? = call.receiver
    while (current != null) {
        current = when {
            current.eIsProxy() -> return Pair(null, calls)
            current is SdsMemberAccess -> current.receiver
            current is SdsReference -> current.declaration
            current is SdsCall -> {
                calls.add(current)
                current.receiver
            }

            // terminal for functions
            current is SdsPlaceholder -> return Pair(current, calls)
            else -> return Pair(null, calls)
        }
    }
    return Pair(null, calls)
}

private fun getSchemaOwnerToTypeParameterMap(assignment: SdsAssignment): Map<SchemaOwner, SdsTypeParameter> {
    return assignment.assigneeList.assignees
        .mapNotNull {
            val result = it.assignedOrNull() ?: return@mapNotNull null

            if (result !is SdsResult) {
                return@mapNotNull null
            }

            val namedType = result.type as? SdsNamedType

            val declaration = namedType
                .typeArgumentsOrEmpty()
                .mapNotNull {
                    val argNamedType = it.value.descendants<SdsNamedType>().firstOrNull()
                    argNamedType?.declaration
                }
                .firstOrNull() // only one schema type parameter allowed per type argument

            val typeParameter = typeParameterWithSchemaOrNull(declaration)
                ?: return@mapNotNull null

            SchemaOwner.Assignee(it) to typeParameter
        }.toMap()
}

@OptIn(ExperimentalSdsApi::class)
internal fun typeParameterWithSchemaOrNull(declaration: SdsAbstractNamedTypeDeclaration?): SdsTypeParameter? {
    if (declaration == null || declaration !is SdsTypeParameter || !declaration.hasSchemaKind()) {
        return null
    }
    return declaration
}
