import { Expression } from '../expression';
import { ExpressionVisitor } from '../expression-visitor';

/**
 * Include expression.
 * 
 * @type {IncludeExpression}
 */
export abstract class IncludeExpression extends Expression
{
    /**
     * Accepts a certain expression visitor.
     * 
     * @param {ExpressionVisitor<TResult>} expressionVisitor Expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Expression visitor result.
     */
    public accept<TResult>(expressionVisitor: ExpressionVisitor<TResult>): TResult
    {
        return expressionVisitor.visitIncludeExpression(this);
    }
}
