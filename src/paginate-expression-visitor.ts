import { PaginateExpression } from './paginate-expression';

/**
 * Visitor to traverse paginate expression tree.
 * 
 * @type {PaginateExpressionVisitor<TResult>}
 */
export interface PaginateExpressionVisitor<TResult>
{
    /**
     * Visits paginate expression.
     * 
     * @param {PaginateExpression} paginateExpression Paginate expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitPaginateExpression(paginateExpression: PaginateExpression): TResult;
}
