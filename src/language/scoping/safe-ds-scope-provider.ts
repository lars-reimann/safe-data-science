import {
    AstNode,
    DefaultScopeProvider,
    EMPTY_SCOPE,
    getContainerOfType,
    getDocument,
    ReferenceInfo,
    Scope,
} from 'langium';
import {
    isSdsAssignment,
    isSdsBlock,
    isSdsCallable,
    isSdsClass,
    isSdsEnum,
    isSdsLambda,
    isSdsMemberAccess,
    isSdsMemberType,
    isSdsModule,
    isSdsNamedType,
    isSdsNamedTypeDeclaration,
    isSdsPlaceholder,
    isSdsReference,
    isSdsSegment,
    isSdsStatement,
    isSdsYield,
    SdsDeclaration,
    SdsExpression,
    SdsMemberAccess,
    SdsMemberType,
    SdsNamedTypeDeclaration,
    SdsPlaceholder,
    SdsReference,
    SdsStatement,
    SdsType,
    SdsYield,
} from '../generated/ast.js';
import {
    assigneesOrEmpty,
    classMembersOrEmpty,
    enumVariantsOrEmpty,
    parametersOrEmpty,
    resultsOrEmpty,
    statementsOrEmpty,
} from '../helpers/shortcuts.js';
import { isContainedIn } from '../helpers/ast.js';
import { isStatic } from '../helpers/checks.js';

export class SafeDsScopeProvider extends DefaultScopeProvider {
    override getScope(context: ReferenceInfo): Scope {
        const node = context.container;

        if (isSdsNamedType(node) && context.property === 'declaration') {
            if (isSdsMemberType(node.$container) && node.$containerProperty === 'member') {
                return this.getScopeForMemberTypeMember(node.$container);
            } else {
                return super.getScope(context);
            }
        } else if (isSdsReference(node) && context.property === 'target') {
            if (isSdsMemberAccess(node.$container) && node.$containerProperty === 'member') {
                return this.getScopeForMemberAccessMember(node.$container);
            } else {
                return this.getScopeForDirectReferenceTarget(node);
            }
        } else if (isSdsYield(node) && context.property === 'result') {
            return this.getScopeForYieldResult(node);
        } else {
            return super.getScope(context);
        }
    }

    private getScopeForMemberTypeMember(node: SdsMemberType): Scope {
        const declaration = this.getUniqueReferencedDeclarationForType(node.receiver);
        if (!declaration) {
            return EMPTY_SCOPE;
        }

        if (isSdsClass(declaration)) {
            const members = declaration.body?.members ?? [];
            return this.createScopeForNodes(members.filter(isSdsNamedTypeDeclaration));
        } else if (isSdsEnum(declaration)) {
            const variants = declaration.body?.variants ?? [];
            return this.createScopeForNodes(variants);
        } else {
            return EMPTY_SCOPE;
        }
    }

    /**
     * Returns the unique declaration that is referenced by this type. If the type references none or multiple
     * declarations, undefined is returned.
     *
     * @param node The type to get the referenced declaration for.
     * @returns The referenced declaration or undefined.
     */
    private getUniqueReferencedDeclarationForType(node: SdsType): SdsNamedTypeDeclaration | undefined {
        if (isSdsNamedType(node)) {
            return node.declaration.ref;
        } else if (isSdsMemberType(node)) {
            return node.member.declaration.ref;
        } else {
            return undefined;
        }
    }

    private getScopeForMemberAccessMember(node: SdsMemberAccess): Scope {
        let currentScope = EMPTY_SCOPE;

        // Static access
        const declaration = this.getUniqueReferencedDeclarationForExpression(node.receiver);
        if (isSdsClass(declaration)) {
            currentScope = this.createScopeForNodes(classMembersOrEmpty(declaration, isStatic));

            //     val superTypeMembers = receiverDeclaration.superClassMembers()
            //         .filter { it.isStatic() }
            // .toList()
            //
            //     return Scopes.scopeFor(members, Scopes.scopeFor(superTypeMembers))
        } else if (isSdsEnum(declaration)) {
            currentScope = this.createScopeForNodes(enumVariantsOrEmpty(declaration));
        }

        //     // Call results
        //     var resultScope = IScope.NULLSCOPE
        //     if (receiver is SdsCall) {
        //         val results = receiver.resultsOrNull()
        //         when {
        //             results == null -> return IScope.NULLSCOPE
        //             results.size > 1 -> return Scopes.scopeFor(results)
        //             results.size == 1 -> resultScope = Scopes.scopeFor(results)
        //         }
        //     }
        //
        //     // Members
        //     val type = (receiver.type() as? NamedType) ?: return resultScope
        //
        //     return when {
        //         type.isNullable && !context.isNullSafe -> resultScope
        //         type is ClassType -> {
        //             val members = type.sdsClass.classMembersOrEmpty().filter { !it.isStatic() }
        //             val superTypeMembers = type.sdsClass.superClassMembers()
        //                 .filter { !it.isStatic() }
        //         .toList()
        //
        //             Scopes.scopeFor(members, Scopes.scopeFor(superTypeMembers, resultScope))
        //         }
        //         type is EnumVariantType -> Scopes.scopeFor(type.sdsEnumVariant.parametersOrEmpty())
        //     else -> resultScope
        //     }

        return currentScope;
    }

    /**
     * Returns the unique declaration that is referenced by this expression. If the expression references none or
     * multiple declarations, undefined is returned.
     *
     * @param node The expression to get the referenced declaration for.
     * @returns The referenced declaration or undefined.
     */
    private getUniqueReferencedDeclarationForExpression(node: SdsExpression): SdsDeclaration | undefined {
        if (isSdsReference(node)) {
            return node.target.ref;
        } else if (isSdsMemberAccess(node)) {
            return node.member.target.ref;
        } else {
            return undefined;
        }
    }

    private getScopeForDirectReferenceTarget(node: SdsReference): Scope {
        // val resource = context.eResource()
        // val packageName = context.containingCompilationUnitOrNull()?.qualifiedNameOrNull()
        //
        // // Declarations in other files
        // var result: IScope = FilteringScope(
        //     super.delegateGetScope(context, SafeDSPackage.Literals.SDS_REFERENCE__DECLARATION),
        // ) {
        //     it.isReferencableExternalDeclaration(resource, packageName)
        // }

        // Declarations in this file
        const currentScope = this.globalDeclarationsInSameFile(node, EMPTY_SCOPE);

        // // Declarations in containing classes
        // context.containingClassOrNull()?.let {
        //     result = classMembers(it, result)
        // }
        //

        // Declarations in containing blocks
        return this.localDeclarations(node, currentScope);
    }

    // private fun classMembers(context: SdsClass, parentScope: IScope): IScope {
    //     return when (val containingClassOrNull = context.containingClassOrNull()) {
    //         is SdsClass -> Scopes.scopeFor(
    //             context.classMembersOrEmpty(),
    //             classMembers(containingClassOrNull, parentScope),
    //         )
    //     else -> Scopes.scopeFor(context.classMembersOrEmpty(), parentScope)
    //     }
    // }

    //     /**
    //      * Removes declarations in this [Resource], [SdsAnnotation]s, and internal [SdsStep]s located in other
    //      * [SdsCompilationUnit]s.
    //      */
    //     private fun IEObjectDescription?.isReferencableExternalDeclaration(
    //         fromResource: Resource,
    //         fromPackageWithQualifiedName: QualifiedName?,
    // ): Boolean {
    //     // Resolution failed in delegate scope
    //     if (this == null) return false
    //
    //     val obj = this.eObjectOrProxy
    //
    //     // Local declarations are added later using custom scoping rules
    //     if (obj.eResource() == fromResource) return false
    //
    //     // Annotations cannot be referenced
    //     if (obj is SdsAnnotation) return false
    //
    //     // Internal steps in another package cannot be referenced
    //     return !(
    //     obj is SdsStep &&
    //     obj.visibility() == SdsVisibility.Internal &&
    //     obj.containingCompilationUnitOrNull()?.qualifiedNameOrNull() != fromPackageWithQualifiedName
    // )
    // }

    private globalDeclarationsInSameFile(node: AstNode, outerScope: Scope): Scope {
        const module = getContainerOfType(node, isSdsModule);
        if (!module) {
            /* c8 ignore next 2 */
            return outerScope;
        }

        const precomputed = getDocument(module).precomputedScopes?.get(module);
        if (!precomputed) {
            /* c8 ignore next 2 */
            return outerScope;
        }

        return this.createScope(precomputed, outerScope);
    }

    private localDeclarations(node: AstNode, outerScope: Scope): Scope {
        // Parameters
        const containingCallable = getContainerOfType(node.$container, isSdsCallable);
        const parameters = parametersOrEmpty(containingCallable?.parameterList);

        // Placeholders up to the containing statement
        const containingStatement = getContainerOfType(node.$container, isSdsStatement);

        let placeholders: Iterable<SdsPlaceholder>;
        if (!containingCallable || isContainedIn(containingStatement, containingCallable)) {
            placeholders = this.placeholdersUpToStatement(containingStatement);
        } else {
            // Placeholders are further away than the parameters
            placeholders = [];
        }

        // Local declarations
        const localDeclarations = [...parameters, ...placeholders];

        // Lambdas can be nested
        if (isSdsLambda(containingCallable)) {
            return this.createScopeForNodes(localDeclarations, this.localDeclarations(containingCallable, outerScope));
        } else {
            return this.createScopeForNodes(localDeclarations, outerScope);
        }
    }

    private *placeholdersUpToStatement(
        statement: SdsStatement | undefined,
    ): Generator<SdsPlaceholder, void, undefined> {
        if (!statement) {
            return;
        }

        const containingBlock = getContainerOfType(statement, isSdsBlock);
        for (const current of statementsOrEmpty(containingBlock)) {
            if (current === statement) {
                return;
            }

            if (isSdsAssignment(current)) {
                yield* assigneesOrEmpty(current).filter(isSdsPlaceholder);
            }
        }
    }

    private getScopeForYieldResult(node: SdsYield): Scope {
        const containingSegment = getContainerOfType(node, isSdsSegment);
        if (!containingSegment) {
            return EMPTY_SCOPE;
        }

        return this.createScopeForNodes(resultsOrEmpty(containingSegment.resultList));
    }
}
