import { SortExpressionVisitor } from './sort-expression-visitor';

/**
 * Represents an expression which is used to sort entities.
 * 
 * @type {SortExpression}
 */
export interface SortExpression
{
    /**
     * Accepts a certain sort expression visitor.
     * 
     * @param {SortExpressionVisitor<TResult>} sortExpressionVisitor Sort expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Sort expression visitor result.
     */
    accept<TResult>(sortExpressionVisitor: SortExpressionVisitor<TResult>): TResult;
}
