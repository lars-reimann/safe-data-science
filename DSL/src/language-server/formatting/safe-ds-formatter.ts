import {AbstractFormatter, AstNode, Formatting} from 'langium';
import * as ast from '../generated/ast';
import {SdsImport, SdsImportAlias, SdsModule} from '../generated/ast';
import {annotationCallsOrEmpty} from "../helpers/astShortcuts";
import {FormattingAction, FormattingActionOptions} from "langium/src/lsp/formatter";
import noSpace = Formatting.noSpace;
import newLine = Formatting.newLine;
import newLines = Formatting.newLines;
import oneSpace = Formatting.oneSpace;
import indent = Formatting.indent;

const oneTab = function (options?: FormattingActionOptions): FormattingAction {
    return {
        options: options ?? {},
        moves: [{
            tabs: 1,
        }]
    };
}

const newLinesWithIndent = function (count: number, options?: FormattingActionOptions): FormattingAction {
    return {
        options: options ?? {},
        moves: [{
            tabs: 1,
            lines: count,
        }]
    };
}

export class SafeDSFormatter extends AbstractFormatter {

    protected override doDocumentFormat(document: LangiumDocument, options: FormattingOptions, range?: Range): TextEdit[] {
        const map = new Map<string, FormattingAction>();
        const collector: FormattingCollector = (node, mode, formatting) => {
            const key = this.nodeModeToKey(node, mode);
            const existing = map.get(key);
            const priority = formatting.options.priority ?? 0;
            const existingPriority = existing?.options.priority ?? 0;
            if (!existing || existingPriority <= priority) {
                if (existing) {
                    console.log(`replace formatting (prio ${existingPriority}) for ${key} with ${JSON.stringify(formatting.moves)} (prio ${priority})`);
                }
                else {
                    console.log(`add formatting for ${key}: ${JSON.stringify(formatting.moves)} (prio ${priority})`);
                }
                map.set(key, formatting);
            }
        };
        this.collector = collector;

        this.iterateAstFormatting(document, range);
        const edits = this.iterateCstFormatting(document, map, options, range);

        // console.log(JSON.stringify(edits))

        return this.avoidOverlappingEdits(document.textDocument, edits);
    }

    protected override format(node: AstNode): void {
        // console.log(node.$type)
        if (ast.isSdsModule(node)) {
            this.formatSdsModule(node)
        }
        if (ast.isSdsImport(node)) {
            this.formatSdsImport(node)
        }
        if (ast.isSdsImportAlias(node)) {
            this.formatSdsImportAlias(node)
        }
        if (ast.isSdsAnnotation(node)) {
            this.formatSdsAnnotation(node)
        }
        if (ast.isSdsAnnotationCall(node)) {
            this.formatSdsAnnotationCall(node)
        }
        if (ast.isSdsAnnotationCallList(node)) {
            this.formatSdsAnnotationCallList(node)
        }
        if (ast.isSdsAttribute(node)) {
            this.formatSdsAttribute(node)
        }
        if (ast.isSdsClass(node)) {
            this.formatSdsClass(node)
        }
        if (ast.isSdsClassBody(node)) {
            this.formatSdsClassBody(node)
        }
        if (ast.isSdsEnum(node)) {
            this.formatSdsEnum(node)
        }
        if (ast.isSdsEnumBody(node)) {
            this.formatSdsEnumBody(node)
        }
        if (ast.isSdsEnumVariant(node)) {
            this.formatSdsEnumVariant(node)
        }
        if (ast.isSdsParameter(node)) {
            this.formatSdsParameter(node)
        }
        if (ast.isSdsParameterList(node)) {
            this.formatSdsParameterList(node)
        }
        if (ast.isSdsArgument(node)) {
            this.formatSdsArgument(node)
        }
        if (ast.isSdsArgumentList(node)) {
            this.formatSdsArgumentList(node)
        }
        if (ast.isSdsPipeline(node)) {
            this.formatSdsPipeline(node)
        }
        if (ast.isSdsStep(node)) {
            this.formatSdsStep(node)
        }
        if (ast.isSdsBlock(node)) {
            this.formatSdsBlock(node)
        }
        if (ast.isSdsResult(node)) {
            this.formatSdsResult(node)
        }
        if (ast.isSdsResultList(node)) {
            this.formatSdsResultList(node)
        }
        if (ast.isSdsParenthesizedExpression(node)) {
            this.formatSdsParenthesizedExpression(node)
        }
        if (ast.isSdsUnionType(node)) {
            this.formatSdsUnionType(node)
        }
        if (ast.isSdsTypeArgumentList(node)) {
            this.formatSdsTypeArgumentList(node)
        }
        if (ast.isSdsBlockLambda(node)) {
            this.formatSdsBlockLambda(node)
        }
        if (ast.isSdsBlockLambdaResult(node)) {
            this.formatSdsBlockLambdaResult(node)
        }
        if (ast.isSdsExpressionLambda(node)) {
            this.formatSdsExpressionLambda(node)
        }
        if (ast.isSdsInfixOperation(node)) {
            this.formatSdsInfixOperation(node)
        }
        if (ast.isSdsPrefixOperation(node)) {
            this.formatSdsPrefixOperation(node)
        }
        if (ast.isSdsIndexedAccess(node)) {
            this.formatSdsIndexedAccess(node)
        }
        if (ast.isSdsNamedType(node)) {
            this.formatSdsNamedType(node)
        }
        if (ast.isSdsAssignment(node)) {
            this.formatSdsAssignment(node)
        }
        if (ast.isSdsExpressionStatement(node)) {
            this.formatSdsExpressionStatement(node)
        }
        if (ast.isSdsMemberAccess(node)) {
            this.formatSdsMemberAccess(node)
        }
        if (ast.isSdsCall(node)) {
            this.formatSdsCall(node)
        }
        if (ast.isSdsSchema(node)) {
            this.formatSdsSchema(node)
        }
        if (ast.isSdsConstraintList(node)) {
            this.formatSdsConstraintList(node)
        }
        if (ast.isSdsTypeParameterConstraint(node)) {
            this.formatSdsTypeParameterConstraint(node)
        }
        if (ast.isSdsCallableType(node)) {
            this.formatSdsCallableType(node)
        }
        if (ast.isSdsPlaceholder(node)) {
            this.formatSdsPlaceholder(node)
        }
        if (ast.isSdsYield(node)) {
            this.formatSdsYield(node)
        }
        if (ast.isSdsAssigneeList(node)) {
            this.formatSdsAssigneeList(node)
        }
        if (ast.isSdsMemberType(node)) {
            this.formatSdsMemberType(node)
        }
        if (ast.isSdsTypeProjection(node)) {
            this.formatSdsTypeProjection(node)
        }
        if (ast.isSdsTemplateString(node)) {
            this.formatSdsTemplateString(node)
        }
    }

    private formatSdsModule(node: SdsModule): void {
        const formatter = this.getNodeFormatter(node);
        const annotations = annotationCallsOrEmpty(node)
        const name = node.name
        const imports = node.imports
        const members = node.members

        // Annotations
        annotations.forEach((value, index) => {
            if (index === 0) {
                formatter.node(value).prepend(noSpace())
            } else {
                formatter.node(value).prepend(newLines(1))
            }
        })

        // Package
        if (annotations.length === 0) {
            formatter.keyword("package").prepend(noSpace())
        } else {
            formatter.keyword("package").prepend(newLines(2))
        }
        formatter.keyword("package").append(oneSpace())
        formatter.keyword(".").surround(noSpace())

        // Imports
        imports.forEach((value, index) => {
            if (index === 0) {
                if (annotations.length === 0 && !name) {
                    formatter.node(value).prepend(noSpace())
                } else {
                    formatter.node(value).prepend(newLines(2))
                }
            } else {
                formatter.node(value).prepend(newLines(1))
            }
        })

        // Members
        members.forEach((value, index) => {
            if (index === 0) {
                if (annotations.length === 0 && !name && imports.length === 0) {
                    formatter.node(value).prepend(noSpace())
                } else {
                    const valueAnnotations = annotationCallsOrEmpty(value)
                    if (valueAnnotations.length > 0) {
                        formatter.node(valueAnnotations[0]).prepend(newLines(2))
                    } else {
                        formatter.node(value).prepend(newLines(2))
                    }
                }
            } else {
                formatter.node(value).prepend(newLines(2))
            }
        })
    }

    private formatSdsImport(node: SdsImport): void {
        const formatter = this.getNodeFormatter(node);

        // Keyword "import"
        formatter.keyword("import").append(oneSpace())

        // Imported namespace
        formatter.keyword(".").surround(noSpace())
    }

    private formatSdsImportAlias(node: SdsImportAlias): void {
        const formatter = this.getNodeFormatter(node);

        // Keyword "as"
        formatter.keyword("as").surround(Formatting.oneSpace())
    }

    private formatSdsAnnotation(node: ast.SdsAnnotation): void {
        const formatter = this.getNodeFormatter(node);

        if (annotationCallsOrEmpty(node).length > 0) {
            formatter.keyword("annotation").prepend(newLine())
        }

        formatter.property("name").prepend(oneSpace())

        formatter.property("parameterList").prepend(noSpace())

        formatter.property("constraintList").prepend(oneSpace())
    }

    private formatSdsAnnotationCall(node: ast.SdsAnnotationCall): void {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("@").append(noSpace())

        formatter.property("argumentList").prepend(noSpace())
    }

    private formatSdsAnnotationCallList(node: ast.SdsAnnotationCallList): void {
        const formatter = this.getNodeFormatter(node);

        // formatter.node(node).prepend(noSpace())

        node.annotationCalls.forEach((value, index) => {
            if (index === 0) {
                formatter.node(value).prepend(newLines(2))
            } else {
                formatter.node(value).prepend(newLine())
            }
        })
    }

    private formatSdsAttribute(node: ast.SdsAttribute): void {
        const formatter = this.getNodeFormatter(node);

        if (node.static) {
            formatter.keyword("val").prepend(oneSpace())
        }

        formatter.property("name").prepend(oneSpace())
    }

    private formatSdsClass(node: ast.SdsClass): void {
        const formatter = this.getNodeFormatter(node);

        if (annotationCallsOrEmpty(node).length > 0) {
            formatter.keyword("class").prepend(newLine())
        }

        formatter.property("name").prepend(oneSpace())
    }

    formatSdsParentTypeList(node: ast.SdsParentTypeList): void {

    }

    private formatSdsClassBody(node: ast.SdsClassBody): void {
        const formatter = this.getNodeFormatter(node);

        const openingBrace = formatter.keyword("{")
        const closingBrace = formatter.keyword("}")

        formatter.interior(openingBrace, closingBrace).prepend(indent())

        // Members
        const members = node.members
        members.forEach((value, index) => {
            if (index === 0) {
                formatter.node(value).append(newLines(2))
            } else {
                formatter.node(value).append(newLines(2))
            }
        })

        if (members.length === 0) {
            openingBrace.append(noSpace())
            closingBrace.prepend(noSpace())
        } else {
            openingBrace.append(newLine())
            closingBrace.prepend(newLine())
        }
    }

    private formatSdsEnum(node: ast.SdsEnum): void {
        const formatter = this.getNodeFormatter(node);

        if (annotationCallsOrEmpty(node).length > 0) {
            formatter.keyword("enum").prepend(newLine())
        }

        formatter.property("name").prepend(oneSpace())

        formatter.property("body").prepend(oneSpace())
    }

    private formatSdsEnumBody(node: ast.SdsEnumBody): void {
        const formatter = this.getNodeFormatter(node);

        const openingBrace = formatter.keyword("{")
        const closingBrace = formatter.keyword("}")

        if (node.variants.length === 0) {
            openingBrace.append(noSpace())
            closingBrace.prepend(noSpace())
        } else {
            openingBrace.append(newLine())
            closingBrace.prepend(newLine())

            formatter.node(node.variants[0]).prepend(indent())
            formatter.nodes(...node.variants.slice(1)).prepend(newLinesWithIndent(2))
        }
    }

    private formatSdsEnumVariant(node: ast.SdsEnumVariant): void {
    }

    formatSdsFunction(node: ast.SdsFunction): void {
        const formatter = this.getNodeFormatter(node);

        // formatter.keyword("fun").prepend(noSpace({priority: -1}))

        formatter.property("name").prepend(oneSpace())
    }

    private formatSdsPipeline(node: ast.SdsPipeline): void {
        const formatter = this.getNodeFormatter(node);

        formatter.property("annotationCallList").prepend(noSpace())

        if (annotationCallsOrEmpty(node).length > 0) {
            formatter.keyword("pipeline").prepend(newLine())
        }

        formatter.property("name").prepend(oneSpace())

        formatter.node(node.body).prepend(oneSpace())
    }

    private formatSdsBlock(node: ast.SdsBlock): void {
        const formatter = this.getNodeFormatter(node);
        const openingBrace = formatter.keyword("{")
        const closingBrace = formatter.keyword("}")

        // formatter.nodes(...node.statements).prepend(indent())

        if (node.statements.length === 0) {
            openingBrace.append(noSpace())
            closingBrace.prepend(noSpace())
        } else {
            formatter.nodes(...node.statements).prepend(indent())
            closingBrace.prepend(newLine())
        }
    }

    private formatSdsStep(node: ast.SdsStep): void {
        const formatter = this.getNodeFormatter(node);

        if (annotationCallsOrEmpty(node).length === 0) {
            if (node.visibility) {
                formatter.keyword("step").prepend(oneSpace())
            }
        } else {
            if (node.visibility) {
                formatter.keyword("private").prepend(newLine())
                formatter.keyword("internal").prepend(newLine())
                formatter.keyword("step").prepend(oneSpace())
            } else {
                formatter.keyword("step").prepend(newLine())
            }
        }

        formatter.property("name").prepend(oneSpace())

        formatter.property("parameterList").prepend(noSpace())

        formatter.property("body").prepend(oneSpace())
    }

    private formatSdsArgument(node: ast.SdsArgument): void {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("=").surround(oneSpace())
    }

    private formatSdsArgumentList(node: ast.SdsArgumentList): void {
        const formatter = this.getNodeFormatter(node);

        const openingParenthesis = formatter.keyword("(")
        const closingParenthesis = formatter.keyword(")")

        const args = node.arguments ?? []

        if (args.length >= 3) {
            openingParenthesis.append(newLine())
            closingParenthesis.prepend(newLine())
            formatter.interior(openingParenthesis, closingParenthesis).prepend(indent())
            formatter.keyword(",").prepend(noSpace()).append(newLine())
        } else {
            openingParenthesis.append(noSpace())
            closingParenthesis.prepend(noSpace())
            formatter.keyword(",").prepend(noSpace()).append(oneSpace())
        }
    }

    private formatSdsParameter(node: ast.SdsParameter): void {
        const formatter = this.getNodeFormatter(node);

        if (annotationCallsOrEmpty(node).length === 0) {
            if (node.variadic) {
                formatter.property("name").prepend(oneSpace())
            }
        } else {
            formatter.property("name").prepend(newLine())
        }

        formatter.keyword(":").prepend(noSpace()).append(oneSpace())

        formatter.keyword("=").surround(oneSpace())
    }

    private formatSdsParameterList(node: ast.SdsParameterList): void {
        const formatter = this.getNodeFormatter(node);

        const openingParenthesis = formatter.keyword("(")
        const closingParenthesis = formatter.keyword(")")

        const parameters = node.parameters ?? []

        if (parameters.length >= 3 || parameters.some(it => annotationCallsOrEmpty(it).length > 0)) {
            openingParenthesis.append(newLine())
            closingParenthesis.prepend(newLine())
            formatter.interior(openingParenthesis, closingParenthesis).prepend(indent())
            formatter.keyword(",").prepend(noSpace()).append(newLine())
        } else {
            openingParenthesis.append(noSpace())
            closingParenthesis.prepend(noSpace())
            formatter.keyword(",").prepend(noSpace()).append(oneSpace())
        }
    }

    private formatSdsResult(node: ast.SdsResult): void {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword(":").prepend(noSpace()).append(oneSpace())
    }

    private formatSdsResultList(node: ast.SdsResultList): void {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("->").surround(oneSpace())

        const openingParenthesis = formatter.keyword("(")
        const closingParenthesis = formatter.keyword(")")

        const results = node.results ?? []

        if (results.length >= 3 || results.some(it => annotationCallsOrEmpty(it).length > 0)) {
            openingParenthesis.append(newLine())
            closingParenthesis.prepend(newLine())
            formatter.interior(openingParenthesis, closingParenthesis).prepend(indent())
            formatter.keyword(",").prepend(noSpace()).append(newLine())
        } else {
            openingParenthesis.append(noSpace())
            closingParenthesis.prepend(noSpace())
            formatter.keyword(",").prepend(noSpace()).append(oneSpace())
        }
    }

    private formatSdsParenthesizedExpression(node: ast.SdsParenthesizedExpression): void {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("(").append(noSpace())
        formatter.keyword(")").prepend(noSpace())
    }

    private formatSdsUnionType(node: ast.SdsUnionType): void {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("union").append(noSpace())
    }

    private formatSdsTypeArgumentList(node: ast.SdsTypeArgumentList): void {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("<").append(noSpace())
        formatter.keyword(">").prepend(noSpace())
        formatter.keyword(",").prepend(noSpace()).append(oneSpace())

        if (node.typeArguments.length > 0) {
            formatter.node(node.typeArguments[0]).prepend(noSpace())
        }

        formatter.keyword(",").prepend(noSpace()).append(oneSpace())
    }

    private formatSdsBlockLambda(node: ast.SdsBlockLambda): void {
        const formatter = this.getNodeFormatter(node);

        formatter.property("body").prepend(oneSpace())

        // formatter.keyword("{").append(noSpace())
        // formatter.keyword("}").prepend(noSpace())
    }

    private formatSdsBlockLambdaResult(node: ast.SdsBlockLambdaResult) {

    }

    private formatSdsExpressionLambda(node: ast.SdsExpressionLambda) {

    }

    private formatSdsInfixOperation(node: ast.SdsInfixOperation) {
        const formatter = this.getNodeFormatter(node);

        formatter.property("operator").surround(oneSpace())
    }

    private formatSdsPrefixOperation(node: ast.SdsPrefixOperation) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("not").append(oneSpace())
        formatter.keyword("-").append(noSpace())
    }

    private formatSdsIndexedAccess(node: ast.SdsIndexedAccess) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("[").surround(noSpace())
        formatter.keyword("]").prepend(noSpace())
    }

    private formatSdsNamedType(node: ast.SdsNamedType) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("?").prepend(noSpace())

        formatter.property("typeArgumentList").prepend(noSpace())
    }

    private formatSdsAssignment(node: ast.SdsAssignment) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("=").surround(oneSpace())
        formatter.keyword(";").prepend(noSpace())
    }

    private formatSdsAssigneeList(node: ast.SdsAssigneeList) {
        const formatter = this.getNodeFormatter(node);

        const assignees = node.assignees ?? []
        formatter.nodes(...assignees.slice(1)).prepend(oneSpace())
    }

    private formatSdsExpressionStatement(node: ast.SdsExpressionStatement) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword(";").prepend(noSpace())
    }

    private formatSdsMemberAccess(node: ast.SdsMemberAccess) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("?").surround(noSpace())
        formatter.keyword(".").surround(noSpace())
    }

    private formatSdsCall(node: ast.SdsCall) {

    }

    private formatSdsSchema(node: ast.SdsSchema) {

    }

    private formatSdsConstraintList(node: ast.SdsConstraintList) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("where").append(oneSpace())

        const openingBrace = formatter.keyword("{")
        const closingBrace = formatter.keyword("}")

        const constraints = node.constraints ?? []

        if (constraints.length === 0) {
            openingBrace.append(noSpace())
            closingBrace.prepend(noSpace())
        } else {
            formatter.nodes(...constraints).prepend(indent())
            formatter.keyword(",").prepend(noSpace())
            closingBrace.prepend(newLine())
        }
    }

    private formatSdsTypeParameterConstraint(node: ast.SdsTypeParameterConstraint) {
        const formatter = this.getNodeFormatter(node);

        formatter.property("operator").surround(oneSpace())
    }

    private formatSdsCallableType(node: ast.SdsCallableType) {

    }

    private formatSdsPlaceholder(node: ast.SdsPlaceholder) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("val").append(oneSpace())
    }

    private formatSdsYield(node: ast.SdsYield) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword("yield").append(oneSpace())
        formatter.property("result").prepend(oneSpace())
    }

    private formatSdsMemberType(node: ast.SdsMemberType) {
        const formatter = this.getNodeFormatter(node);

        formatter.keyword(".").surround(noSpace())
    }

    private formatSdsTypeProjection(node: ast.SdsTypeProjection) {
        const formatter = this.getNodeFormatter(node);

        formatter.property("variance").append(oneSpace())
    }

    private formatSdsTemplateString(node: ast.SdsTemplateString) {
        const formatter = this.getNodeFormatter(node);

        node.expressions.forEach((value) => {
            if (!ast.isSdsTemplateStringPart(value)) {
                formatter.node(value).surround(oneSpace())
            }
        })
    }
}


//             is SdsAnnotation -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Keyword "annotation"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatKeyword(node, "annotation", null, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "annotation", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, null)
//
//                 // EObject "parameterList"
//                 doc.formatObject(node.parameterList, noSpace, null)
//
//                 // EObject "constraint"
//                 doc.formatObject(node.constraint, oneSpace, null)
//             }
//             is SdsAnnotationCall -> {
//                 // Keyword "@"
//                 doc.formatKeyword(node, "@", null, noSpace)
//
//                 // Property "annotation"
//                 doc.formatProperty(node, SDS_ANNOTATION_CALL__ANNOTATION, noSpace, null)
//
//                 // EObject "argumentList"
//                 doc.formatObject(node.argumentList, noSpace, null)
//             }
//             is SdsAttribute -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Keyword "static"
//                 if (node.annotationCallsOrEmpty().isNotEmpty()) {
//                     doc.formatKeyword(node, "static", oneSpace, null)
//                 }
//
//                 // Keyword "attr"
//                 if (node.annotationCallsOrEmpty().isEmpty() && !node.isStatic) {
//                     doc.formatKeyword(node, "attr", null, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "attr", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, noSpace)
//
//                 // Keyword ":"
//                 doc.formatKeyword(node, ":", noSpace, oneSpace)
//
//                 // EObject "type"
//                 doc.formatObject(node.type, oneSpace, null)
//             }
//             is SdsClass -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Keyword "class"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatKeyword(node, "class", null, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "class", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, null)
//
//                 // EObject "typeParameterList"
//                 doc.formatObject(node.typeParameterList, noSpace, null)
//
//                 // EObject "constructor"
//                 doc.formatObject(node.parameterList, noSpace, null)
//
//                 // EObject "parentTypeList"
//                 doc.formatObject(node.parentTypeList, oneSpace, null)
//
//                 // EObject "body"
//                 doc.formatObject(node.body, oneSpace, null)
//             }
//             is SdsParentTypeList -> {
//                 // Keyword "sub"
//                 doc.formatKeyword(node, "sub", null, oneSpace)
//
//                 // Property "parentTypes"
//                 node.parentTypes.forEach {
//                     doc.formatObject(it)
//                 }
//
//                 // Keywords ","
//                 doc.formatCommas(node)
//             }
//             is SdsClassBody -> {
//                 // Keyword "{"
//                 val openingBrace = node.regionForKeyword("{")
//                 if (node.members.isEmpty()) {
//                     doc.append(openingBrace, noSpace)
//                 } else {
//                     doc.append(openingBrace, newLine)
//                 }
//
//                 // Property "members"
//                 node.members.forEach {
//                     doc.format(it)
//                     if (node.members.last() == it) {
//                         doc.append(it, newLine)
//                     } else {
//                         doc.append(it, newLines(2))
//                     }
//                 }
//
//                 // Keyword "}"
//                 val closingBrace = node.regionForKeyword("}")
//                 doc.prepend(closingBrace, noSpace)
//
//                 doc.interior(openingBrace, closingBrace, indent)
//             }
//             is SdsEnum -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Keyword "enum"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatKeyword(node, "enum", null, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "enum", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, null)
//
//                 // EObject "body"
//                 doc.formatObject(node.body, oneSpace, null)
//             }
//             is SdsEnumBody -> {
//                 // Keyword "{"
//                 val openingBrace = node.regionForKeyword("{")
//                 if (node.variants.isEmpty()) {
//                     doc.append(openingBrace, noSpace)
//                 } else {
//                     doc.append(openingBrace, newLine)
//                 }
//
//                 // Property "variants"
//                 node.variants.forEach {
//                     doc.format(it)
//                     if (node.variants.first() != it) {
//                         doc.prepend(it, newLines(2))
//                     }
//                 }
//
//                 // Keywords ","
//                 val commas = textRegionExtensions.allRegionsFor(node).keywords(",")
//                 commas.forEach {
//                     doc.prepend(it, noSpace)
//                 }
//
//                 // Keyword "}"
//                 val closingBrace = node.regionForKeyword("}")
//                 if (node.variants.isEmpty()) {
//                     doc.prepend(closingBrace, noSpace)
//                 } else {
//                     doc.prepend(closingBrace, newLine)
//                 }
//
//                 doc.interior(openingBrace, closingBrace, indent)
//             }
//             is SdsEnumVariant -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Property "name"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME)
//                 } else {
//                     doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, null)
//                 }
//
//                 // EObject "typeParameterList"
//                 doc.formatObject(node.typeParameterList, noSpace, null)
//
//                 // EObject "parameterList"
//                 doc.formatObject(node.parameterList, noSpace, null)
//
//                 // EObject "constraint"
//                 doc.formatObject(node.constraint, oneSpace, null)
//             }
//             is SdsFunction -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Keyword "static"
//                 if (node.annotationCallsOrEmpty().isNotEmpty()) {
//                     doc.formatKeyword(node, "static", oneSpace, null)
//                 }
//
//                 // Keyword "fun"
//                 if (node.annotationCallsOrEmpty().isEmpty() && !node.isStatic) {
//                     doc.formatKeyword(node, "fun", null, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "fun", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, null)
//
//                 // EObject "typeParameterList"
//                 doc.formatObject(node.typeParameterList, noSpace, null)
//
//                 // EObject "parameterList"
//                 doc.formatObject(node.parameterList, noSpace, null)
//
//                 // EObject "resultList"
//                 doc.formatObject(node.resultList, oneSpace, null)
//
//                 // EObject "body"
//                 doc.formatObject(node.body, oneSpace, null)
//             }
//             is SdsFunctionBody -> {
//                 // Keyword "{"
//                 val openingBrace = node.regionForKeyword("{")
//                 if (node.statements.isEmpty()) {
//                     doc.append(openingBrace, noSpace)
//                 } else {
//                     doc.append(openingBrace, newLine)
//                 }
//
//                 // Property "statements"
//                 node.statements.forEach {
//                     doc.format(it)
//                     if (node.statements.last() == it) {
//                         doc.append(it, newLine)
//                     } else {
//                         doc.append(it, newLines(2))
//                     }
//                 }
//
//                 // Keyword "}"
//                 val closingBrace = node.regionForKeyword("}")
//                 doc.prepend(closingBrace, noSpace)
//
//                 doc.interior(openingBrace, closingBrace, indent)
//             }
//             is SdsPipeline -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Keyword "pipeline"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatKeyword(node, "pipeline", noSpace, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "pipeline", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, null, oneSpace)
//
//                 // EObject "body"
//                 doc.formatObject(node.body)
//             }
//             is SdsStep -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Property "visibility"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatProperty(node, SDS_STEP__VISIBILITY, noSpace, null)
//                 }
//
//                 // Keyword "step"
//                 if (node.annotationCallsOrEmpty().isEmpty() && node.visibility == null) {
//                     doc.formatKeyword(node, "step", noSpace, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "step", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, null, noSpace)
//
//                 // EObject "parameterList"
//                 doc.formatObject(node.parameterList)
//
//                 // EObject "resultList"
//                 doc.formatObject(node.resultList)
//
//                 // EObject "body"
//                 doc.formatObject(node.body, oneSpace, null)
//             }
//             is SdsArgumentList -> {
//                 // Keyword "("
//                 doc.formatKeyword(node, "(", null, noSpace)
//
//                 // Property "arguments"
//                 node.arguments.forEach {
//                     doc.formatObject(it)
//                 }
//
//                 // Keywords ","
//                 doc.formatCommas(node)
//
//                 // Keyword ")"
//                 doc.formatKeyword(node, ")", noSpace, null)
//             }
//             is SdsArgument -> {
//                 // Property "parameter"
//                 doc.formatProperty(node, SDS_ARGUMENT__PARAMETER)
//
//                 // Keyword "="
//                 doc.formatKeyword(node, "=", oneSpace, oneSpace)
//
//                 // EObject "value"
//                 doc.formatObject(node.value)
//             }
//             is SdsParameterList -> {
//                 // Keyword "("
//                 doc.formatKeyword(node, "(", null, noSpace)
//
//                 // Property "parameters"
//                 node.parameters.forEach {
//                     doc.formatObject(it)
//                 }
//
//                 // Keywords ","
//                 doc.formatCommas(node)
//
//                 // Keyword ")"
//                 doc.formatKeyword(node, ")", noSpace, null)
//             }
//             is SdsParameter -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node, inlineAnnotations = true)
//
//                 // Keyword "vararg"
//                 if (node.annotationCallsOrEmpty().isNotEmpty()) {
//                     doc.formatKeyword(node, "vararg", oneSpace, null)
//                 }
//
//                 // Property "name"
//                 val name = node.regionForProperty(SDS_ABSTRACT_DECLARATION__NAME)
//                 if (node.annotationCallsOrEmpty().isNotEmpty() || node.isVariadic) {
//                     doc.prepend(name, oneSpace)
//                 }
//
//                 // Keyword ":"
//                 doc.formatKeyword(node, ":", noSpace, oneSpace)
//
//                 // EObject "type"
//                 doc.formatObject(node.type)
//
//                 // Keyword "="
//                 doc.formatKeyword(node, "=", oneSpace, oneSpace)
//
//                 // EObject "defaultValue"
//                 doc.formatObject(node.defaultValue)
//             }
//             is SdsResultList -> {
//                 // Keyword "->"
//                 doc.formatKeyword(node, "->", oneSpace, oneSpace)
//
//                 // Keyword "("
//                 doc.formatKeyword(node, "(", null, noSpace)
//
//                 // Property "results"
//                 node.results.forEach {
//                     doc.formatObject(it)
//                 }
//
//                 // Keywords ","
//                 doc.formatCommas(node)
//
//                 // Keyword ")"
//                 doc.formatKeyword(node, ")", noSpace, null)
//             }
//             is SdsResult -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node, inlineAnnotations = true)
//
//                 // Property "name"
//                 val name = node.regionForProperty(SDS_ABSTRACT_DECLARATION__NAME)
//                 if (node.annotationCallsOrEmpty().isNotEmpty()) {
//                     doc.prepend(name, oneSpace)
//                 }
//
//                 // Keyword ":"
//                 doc.formatKeyword(node, ":", noSpace, oneSpace)
//
//                 // EObject "type"
//                 doc.formatObject(node.type)
//             }
//
//             /**********************************************************************************************************
//              * Schema
//              **********************************************************************************************************/
//
//             is SdsSchema -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node)
//
//                 // Keyword "schema"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatKeyword(node, "schema", noSpace, oneSpace)
//                 } else {
//                     doc.formatKeyword(node, "schema", oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, null, oneSpace)
//
//                 // EObject "columnList"
//                 doc.formatObject(node.columnList, oneSpace, null)
//             }
//             is SdsColumnList -> {
//                 // Keyword "{"
//                 val openingBrace = node.regionForKeyword("{")
//                 if (node.columns.isEmpty()) {
//                     doc.append(openingBrace, noSpace)
//                 } else {
//                     doc.append(openingBrace, newLine)
//                 }
//
//                 // Property "columns"
//                 node.columns.forEach {
//                     doc.formatObject(it, newLine, noSpace)
//                 }
//
//                 // Keywords ","
//                 doc.formatKeyword(node, ",", noSpace, newLine)
//
//                 // Keyword "}"
//                 val closingBrace = node.regionForKeyword("}")
//                 if (node.columns.isEmpty()) {
//                     doc.prepend(closingBrace, noSpace)
//                 } else {
//                     doc.prepend(closingBrace, newLine)
//                 }
//                 doc.interior(openingBrace, closingBrace, indent)
//             }
//             is SdsColumn -> {
//                 // EObject "columnName"
//                 doc.formatObject(node.columnName, null, oneSpace)
//
//                 // Keyword ":"
//                 doc.formatKeyword(node, ":", oneSpace, oneSpace)
//
//                 // EObject "columnType"
//                 doc.formatObject(node.columnType)
//             }
//
//             /**********************************************************************************************************
//              * Statements
//              **********************************************************************************************************/
//
//             is SdsBlock -> {
//                 val internalPadding: KFunction1<Format, Unit>
//                 if (node.statements.isEmpty()) {
//                     internalPadding = noSpace
//                 } else {
//                     internalPadding = newLine
//                 }
//
//                 val statementsSuffix: KFunction1<Format, Unit>
//                 if (node.eContainer() is SdsConstraint || node.eContainer() is SdsPredicate) {
//                     statementsSuffix = noSpace
//                 } else {
//                     statementsSuffix = newLine
//                 }
//
//                 // Keyword "{"
//                 val openingBrace = node.regionForKeyword("{")
//                 doc.append(openingBrace, internalPadding)
//
//                 // Property "statements"
//                 node.statements.forEach {
//                     doc.formatObject(it, null, statementsSuffix)
//                 }
//
//                 // Keywords "," (for SdsConstraint or SdsPredicate)
//                 if (statementsSuffix == noSpace) {
//                     doc.formatKeyword(node, ",", noSpace, newLine)
//                 }
//
//                 // Keyword "}"
//                 val closingBrace = node.regionForKeyword("}")
//                 doc.prepend(closingBrace, internalPadding)
//
//                 doc.interior(openingBrace, closingBrace, indent)
//             }
//             is SdsAssignment -> {
//                 // EObject "assigneeList"
//                 doc.formatObject(node.assigneeList, null, oneSpace)
//
//                 // Keyword "="
//                 doc.formatKeyword(node, "=", oneSpace, oneSpace)
//
//                 // EObject "expression"
//                 doc.formatObject(node.expression)
//
//                 // Keyword ";"
//                 doc.formatKeyword(node, ";", noSpace, null)
//             }
//             is SdsAssigneeList -> {
//                 // Property "assignees"
//                 node.assignees.forEach {
//                     doc.formatObject(it)
//                 }
//
//                 // Keywords ","
//                 doc.formatCommas(node)
//             }
//             is SdsBlockLambdaResult -> {
//                 // Keyword "yield"
//                 doc.formatKeyword(node, "yield", null, oneSpace)
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, null)
//             }
//             is SdsPlaceholder -> {
//                 // Keyword "val"
//                 doc.formatKeyword(node, "val", null, oneSpace)
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME, oneSpace, null)
//             }
//             is SdsYield -> {
//                 // Keyword "yield"
//                 doc.formatKeyword(node, "yield", null, oneSpace)
//
//                 // Property "result"
//                 doc.formatProperty(node, SDS_YIELD__RESULT)
//             }
//             is SdsExpressionStatement -> {
//                 // EObject "expression"
//                 doc.formatObject(node.expression)
//
//                 // Keyword ";"
//                 doc.formatKeyword(node, ";", noSpace, null)
//             }
//
//             /**********************************************************************************************************
//              * Expressions
//              **********************************************************************************************************/
//
//             is SdsBlockLambda -> {
//                 // EObject "parameterList"
//                 doc.formatObject(node.parameterList, null, oneSpace)
//
//                 // EObject "body"
//                 doc.formatObject(node.body, oneSpace, null)
//             }
//             is SdsCall -> {
//                 // EObject "receiver"
//                 doc.formatObject(node.receiver, null, noSpace)
//
//                 // EObject "typeArgumentList"
//                 doc.formatObject(node.typeArgumentList, null, noSpace)
//
//                 // EObject "argumentList"
//                 doc.formatObject(node.argumentList)
//             }
//             is SdsExpressionLambda -> {
//                 // EObject "parameterList"
//                 doc.formatObject(node.parameterList, null, oneSpace)
//
//                 // Keyword "->"
//                 doc.formatKeyword(node, "->", oneSpace, oneSpace)
//
//                 // EObject "result"
//                 doc.formatObject(node.result, oneSpace, null)
//             }
//             is SdsIndexedAccess -> {
//                 // EObject "receiver"
//                 doc.formatObject(node.receiver, null, noSpace)
//
//                 // Keyword "["
//                 doc.formatKeyword(node, "[", noSpace, noSpace)
//
//                 // EObject "index"
//                 doc.formatObject(node.index, noSpace, noSpace)
//
//                 // Keyword "]"
//                 doc.formatKeyword(node, "]", noSpace, null)
//             }
//             is SdsInfixOperation -> {
//                 // EObject "leftOperand"
//                 doc.formatObject(node.leftOperand, null, oneSpace)
//
//                 // Property "operator"
//                 doc.formatProperty(node, SDS_INFIX_OPERATION__OPERATOR, oneSpace, oneSpace)
//
//                 // EObject "rightOperand"
//                 doc.formatObject(node.rightOperand, oneSpace, null)
//             }
//             is SdsMemberAccess -> {
//                 // EObject "receiver"
//                 doc.formatObject(node.receiver, null, noSpace)
//
//                 // Property "nullable"
//                 doc.formatProperty(node, SDS_MEMBER_ACCESS__NULL_SAFE, noSpace, noSpace)
//
//                 // Keyword "."
//                 doc.formatKeyword(node, ".", noSpace, noSpace)
//
//                 // EObject "member"
//                 doc.formatObject(node.member, noSpace, null)
//             }
//             is SdsParenthesizedExpression -> {
//                 // Keyword "("
//                 doc.formatKeyword(node, "(", null, noSpace)
//
//                 // EObject "expression"
//                 doc.formatObject(node.expression, noSpace, noSpace)
//
//                 // Keyword ")"
//                 doc.formatKeyword(node, ")", noSpace, null)
//             }
//             is SdsPrefixOperation -> {
//                 // Property "operator"
//                 doc.formatProperty(
//                     node,
//                     SDS_PREFIX_OPERATION__OPERATOR,
//                     prepend = null,
//                     append = if (node.operator == "not") oneSpace else noSpace,
//             )
//
//                 // EObject "operand"
//                 doc.formatObject(node.operand)
//             }
//             is SdsTemplateString -> {
//                 // Property expressions
//                 node.expressions.forEach {
//                     if (it !is SdsAbstractTemplateStringPart) {
//                         doc.formatObject(it, oneSpace, oneSpace)
//                     }
//                 }
//             }
//
//             /**********************************************************************************************************
//              * Types
//              **********************************************************************************************************/
//
//             is SdsCallableType -> {
//                 // Keyword "callable"
//                 doc.formatKeyword(node, "callable", null, oneSpace)
//
//                 // EObject "parameterList"
//                 doc.formatObject(node.parameterList, oneSpace, oneSpace)
//
//                 // EObject "resultList"
//                 doc.formatObject(node.resultList, oneSpace, null)
//             }
//             is SdsMemberType -> {
//                 // EObject "receiver"
//                 doc.formatObject(node.receiver, null, noSpace)
//
//                 // Keyword "."
//                 doc.formatKeyword(node, ".", noSpace, noSpace)
//
//                 // EObject "member"
//                 doc.formatObject(node.member, noSpace, null)
//             }
//             is SdsNamedType -> {
//                 // Property "declaration"
//                 doc.formatProperty(node, SDS_NAMED_TYPE__DECLARATION)
//
//                 // EObject "typeArgumentList"
//                 doc.formatObject(node.typeArgumentList, noSpace, noSpace)
//
//                 // Property "nullable"
//                 doc.formatProperty(node, SDS_NAMED_TYPE__NULLABLE, noSpace, null)
//             }
//             is SdsParenthesizedType -> {
//                 // Keyword "("
//                 doc.formatKeyword(node, "(", null, noSpace)
//
//                 // EObject "type"
//                 doc.formatObject(node.type, noSpace, noSpace)
//
//                 // Keyword ")"
//                 doc.formatKeyword(node, ")", noSpace, null)
//             }
//             is SdsUnionType -> {
//                 // Keyword "union"
//                 doc.formatKeyword(node, "union", null, noSpace)
//
//                 // EObject "typeArgumentList"
//                 doc.formatObject(node.typeArgumentList, noSpace, null)
//             }
//             is SdsTypeArgumentList -> {
//                 // Keyword "<"
//                 doc.formatKeyword(node, "<", null, noSpace)
//
//                 // Property "typeArguments"
//                 node.typeArguments.forEach {
//                     doc.formatObject(it)
//                 }
//
//                 // Keywords ","
//                 doc.formatCommas(node)
//
//                 // Keyword ">"
//                 doc.formatKeyword(node, ">", noSpace, null)
//             }
//             is SdsTypeArgument -> {
//                 // Property "typeParameter"
//                 doc.formatProperty(node, SDS_TYPE_ARGUMENT__TYPE_PARAMETER)
//
//                 // Keyword "="
//                 doc.formatKeyword(node, "=", oneSpace, oneSpace)
//
//                 // EObject "value"
//                 doc.formatObject(node.value)
//             }
//             is SdsTypeProjection -> {
//                 // Property "variance"
//                 doc.formatProperty(node, SDS_TYPE_PROJECTION__VARIANCE, null, oneSpace)
//
//                 // EObject "type"
//                 doc.formatObject(node.type)
//             }
//             is SdsTypeParameterList -> {
//                 // Keyword "<"
//                 doc.formatKeyword(node, "<", null, noSpace)
//
//                 // Property "typeParameters"
//                 node.typeParameters.forEach {
//                     doc.formatObject(it)
//                 }
//
//                 // Keywords ","
//                 doc.formatCommas(node)
//
//                 // Keyword ">"
//                 doc.formatKeyword(node, ">", noSpace, null)
//             }
//             is SdsTypeParameter -> {
//                 // Propertys "annotations"
//                 doc.formatAnnotations(node, inlineAnnotations = true)
//
//                 // Property "variance"
//                 if (node.annotationCallsOrEmpty().isEmpty()) {
//                     doc.formatProperty(node, SDS_TYPE_PARAMETER__VARIANCE, null, oneSpace)
//                 } else {
//                     doc.formatProperty(node, SDS_TYPE_PARAMETER__VARIANCE, oneSpace, oneSpace)
//                 }
//
//                 // Property "name"
//                 doc.formatProperty(node, SDS_ABSTRACT_DECLARATION__NAME)
//
//                 // Property "kind"
//                 doc.formatKeyword(node, "::", oneSpace, oneSpace)
//                 doc.formatProperty(node, SDS_TYPE_PARAMETER__KIND)
//             }
//             is SdsConstraint -> {
//                 // Keyword "constraint"
//                 doc.formatKeyword(node, "constraint", null, oneSpace)
//
//                 // EObject "body"
//                 doc.formatObject(node.body)
//             }
//             is SdsTypeParameterConstraint -> {
//                 // Property "leftOperand"
//                 doc.formatProperty(node, SDS_TYPE_PARAMETER_CONSTRAINT__LEFT_OPERAND, null, oneSpace)
//
//                 // Property "operator"
//                 doc.formatProperty(node, SDS_TYPE_PARAMETER_CONSTRAINT__OPERATOR, oneSpace, oneSpace)
//
//                 // EObject "rightOperand"
//                 doc.formatObject(node.rightOperand, oneSpace, null)
//             }
//         }
//     }
//
//     /**
//      * Formats comments, including test markers. Without this override formatting a file with test markers throws an
//      * exception in VS Code.
//      */
//     override fun createCommentReplacer(comment: IComment): ITextReplacer? {
//         val grammarElement = comment.grammarElement
//         if (grammarElement is TerminalRule && grammarElement.name == "TEST_MARKER") {
//         return TestMarkerReplacer(comment)
//     }
//
//     return super.createCommentReplacer(comment)
// }
//
//     /******************************************************************************************************************
//      * Helpers
//      ******************************************************************************************************************/
//
// private fun useSpacesForIndentation() {
//         val newPreferences = mutableMapOf<String, String>()
//         newPreferences[indentation.id] = "    "
//         request.preferences = MapBasedPreferenceValues(preferences, newPreferences)
//     }
//
// private fun EObject.regionForProperty(feature: EStructuralProperty): ISemanticRegion? {
//             return textRegionExtensions.regionFor(this).feature(feature)
//         }
//
//         private fun EObject.regionForKeyword(keyword: String): ISemanticRegion? {
//             return textRegionExtensions.regionFor(this).keyword(keyword)
//         }
//
//         private fun IFormattableDocument.formatObject(
//         node: EObject?,
//         prepend: KFunction1<Format, Unit>? = null,
//         append: KFunction1<Format, Unit>? = null,
// ) {
//         if (node != null) {
//             if (prepend != null) {
//                 this.prepend(node, prepend)
//             }
//             this.format(node)
//             if (append != null) {
//                 this.append(node, append)
//             }
//         }
//     }
//
// private fun IFormattableDocument.formatProperty(
//         node: EObject?,
//         feature: EStructuralProperty,
//         prepend: KFunction1<Format, Unit>? = null,
//         append: KFunction1<Format, Unit>? = null,
// ) {
//         if (node == null) {
//             return
//         }
//
//         val featureRegion = node.regionForProperty(feature)
//         if (featureRegion != null) {
//             if (prepend != null) {
//                 this.prepend(featureRegion, prepend)
//             }
//             if (append != null) {
//                 this.append(featureRegion, append)
//             }
//         }
//     }
//
// private fun IFormattableDocument.formatKeyword(
//         node: EObject?,
//         keyword: String,
//         prepend: KFunction1<Format, Unit>? = null,
//         append: KFunction1<Format, Unit>? = null,
// ) {
//         if (node == null) {
//             return
//         }
//
//         val keywordRegion = node.regionForKeyword(keyword)
//         if (keywordRegion != null) {
//             if (prepend != null) {
//                 this.prepend(keywordRegion, prepend)
//             }
//             if (append != null) {
//                 this.append(keywordRegion, append)
//             }
//         }
//     }
//
// private fun IFormattableDocument.formatAnnotations(
//         node: SdsAbstractDeclaration,
//         inlineAnnotations: Boolean = false,
// ) {
//         // Property "annotations"
//         node.annotationCallsOrEmpty().forEach {
//             format(it)
//
//             if (inlineAnnotations) {
//                 append(it, oneSpace)
//             } else {
//                 append(it, newLine)
//             }
//         }
//     }
//
// private fun IFormattableDocument.formatCommas(node: EObject) {
//         val commas = textRegionExtensions.allRegionsFor(node).keywords(",")
//         commas.forEach {
//             prepend(it, noSpace)
//             append(it, oneSpace)
//         }
//     }
// }
//
// class TestMarkerReplacer(comment: IComment) : CommentReplacer(comment) {
//     override fun createReplacements(context: ITextReplacerContext): ITextReplacerContext {
//         return context
//     }
//
//     override fun configureWhitespace(leading: WhitespaceReplacer, trailing: WhitespaceReplacer) {
//         if (comment.text == "»") {
//             trailing.formatting.space = ""
//         } else if (comment.text == "«") {
//             leading.formatting.space = ""
//         }
//     }
// }
//
// class WhitespaceCollapser(doc: IFormattableDocument, name: ISemanticRegion?) : AbstractTextReplacer(doc, name) {
//     override fun createReplacements(context: ITextReplacerContext): ITextReplacerContext {
//         context.addReplacement(collapseWhitespace())
//         return context
//     }
//
// private fun collapseWhitespace(): ITextReplacement {
//         return region.replaceWith(region.text.replace(Regex("\\s+"), ""))
//     }
// }
