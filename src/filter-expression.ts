import { FilterExpressionVisitor } from './filter-expression-visitor';

/**
 * Represents an expression which is used to filter entities.
 * 
 * @type {FilterExpression}
 */
export interface FilterExpression
{
    /**
     * Accepts a certain filter expression visitor.
     * 
     * @param {FilterExpressionVisitor<TResult>} filterExpressionVisitor Filter expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Filter expression visitor result.
     */
    accept<TResult>(filterExpressionVisitor: FilterExpressionVisitor<TResult>): TResult;
}
