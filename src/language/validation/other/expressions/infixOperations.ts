import { SdsInfixOperation } from '../../../generated/ast.js';
import { ValidationAcceptor } from 'langium';
import { SafeDsServices } from '../../../safe-ds-module.js';
import { toConstantExpression } from '../../../partialEvaluation/toConstantExpression.js';
import { ConstantFloat, ConstantInt } from '../../../partialEvaluation/model.js';
import { UnknownType } from '../../../typing/model.js';

export const CODE_INFIX_OPERATION_DIVISION_BY_ZERO = 'infix-operation/division-by-zero';

export const divisionDivisorMustNotBeZero = (services: SafeDsServices) => {
    const typeComputer = services.types.TypeComputer;
    const zeroInt = new ConstantInt(BigInt(0));
    const zeroFloat = new ConstantFloat(0.0);
    const minusZeroFloat = new ConstantFloat(-0.0);

    return (node: SdsInfixOperation, accept: ValidationAcceptor): void => {
        if (node.operator !== '/') {
            return;
        }

        const dividendType = typeComputer.computeType(node.leftOperand);
        if (
            dividendType === UnknownType ||
            (!dividendType.equals(typeComputer.Int) && !dividendType.equals(typeComputer.Float))
        ) {
            return;
        }

        const divisorValue = toConstantExpression(node.rightOperand);
        if (
            divisorValue &&
            (divisorValue.equals(zeroInt) || divisorValue.equals(zeroFloat) || divisorValue.equals(minusZeroFloat))
        ) {
            accept('error', 'Division by zero.', {
                node,
                code: CODE_INFIX_OPERATION_DIVISION_BY_ZERO,
            });
        }
    };
};