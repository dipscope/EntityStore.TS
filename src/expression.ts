import { ExpressionVisitor } from './expression-visitor';

/**
 * Represents a statement which a certain expression visitor should handle.
 * 
 * @type {Expression}
 */
export abstract class Expression
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
