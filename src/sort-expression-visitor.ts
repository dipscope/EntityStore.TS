import { AscSortExpression } from './sort-expressions/asc-sort-expression';
import { DescSortExpression } from './sort-expressions/desc-sort-expression';

/**
 * Visitor to traverse sort expression tree.
 * 
 * @type {SortExpressionVisitor<TResult>}
 */
export interface SortExpressionVisitor<TResult>
{
    /**
     * Visits asc sort expression.
     * 
     * @param {AscSortExpression} ascSortExpression Asc sort expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitAscSortExpression(ascSortExpression: AscSortExpression): TResult;

    /**
     * Visits desc sort expression.
     * 
     * @param {DescSortExpression} descSortExpression Desc sort expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitDescSortExpression(descSortExpression: DescSortExpression): TResult;
}
