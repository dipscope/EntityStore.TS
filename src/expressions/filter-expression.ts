import { Expression } from '../expression';
import { ExpressionVisitor } from '../expression-visitor';

/**
 * Filter expression.
 * 
 * @type {FilterExpression}
 */
export abstract class FilterExpression extends Expression
{
    /**
     * Accepts a certain expression visitor.
     * 
     * @param {ExpressionVisitor<TResult>} expressionVisitor Expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Expression visitor result.
     */
    public abstract accept<TResult>(expressionVisitor: ExpressionVisitor<TResult>): TResult;
}
