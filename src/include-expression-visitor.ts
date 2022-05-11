import { IncludeExpression } from './include-expression';

/**
 * Visitor to traverse include expression tree.
 * 
 * @type {IncludeExpressionVisitor<TResult>}
 */
export interface IncludeExpressionVisitor<TResult>
{
    /**
     * Visits include expression.
     * 
     * @param {IncludeExpression} includeExpression Include expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitIncludeExpression(includeExpression: IncludeExpression): TResult
}
