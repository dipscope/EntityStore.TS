import { CursorPaginateExpression } from './paginate-expressions/cursor-paginate-expression';
import { OffsetPaginateExpression } from './paginate-expressions/offset-paginate-expression';
import { SizePaginateExpression } from './paginate-expressions/size-paginate-expression';

/**
 * Visitor to traverse paginate expression tree.
 * 
 * @type {PaginateExpressionVisitor<TResult>}
 */
export interface PaginateExpressionVisitor<TResult>
{
    /**
     * Visits cursor paginate expression.
     * 
     * @param {CursorPaginateExpression} cursorPaginateExpression Cursor paginate expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitCursorPaginateExpression(cursorPaginateExpression: CursorPaginateExpression): TResult;

    /**
     * Visits offset paginate expression.
     * 
     * @param {OffsetPaginateExpression} offsetPaginateExpression Offset paginate expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitOffsetPaginateExpression(offsetPaginateExpression: OffsetPaginateExpression): TResult;

    /**
     * Visits size paginate expression.
     * 
     * @param {SizePaginateExpression} sizePaginateExpression Size paginate expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitSizePaginateExpression(sizePaginateExpression: SizePaginateExpression): TResult;
}
