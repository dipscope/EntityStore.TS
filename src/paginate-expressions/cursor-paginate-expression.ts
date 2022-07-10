import { Cursor } from '../cursor';
import { EntityInfo } from '../entity-info';
import { PaginateExpression } from '../paginate-expression';
import { PaginateExpressionVisitor } from '../paginate-expression-visitor';

/**
 * Represents a cursor based expression which is used to paginate entities.
 * 
 * @type {CursorPaginateExpression}
 */
export class CursorPaginateExpression extends PaginateExpression
{
    /**
     * How much entities to take after of before cursor.
     * 
     * @type {number}
     */
    public readonly take?: number;
    
    /**
     * Cursor after which to take entities.
     * 
     * @type {Cursor}
     */
    public readonly afterCursor?: Cursor;

    /**
     * Cursor before which to take entities.
     * 
     * @type {Cursor}
     */
    public readonly beforeCursor?: Cursor;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<any>} entityInfo Entity info.
     * @param {number} take How much entities to take after of before cursor.
     * @param {Cursor} afterCursor Cursor after which to take entities.
     * @param {Cursor} beforeCursor Cursor before which to take entities.
     */
    public constructor(entityInfo: EntityInfo<any>, take?: number, afterCursor?: Cursor, beforeCursor?: Cursor)
    {
        super(entityInfo);

        this.take = take;
        this.afterCursor = afterCursor;
        this.beforeCursor = beforeCursor;

        return;
    }

    /**
     * Accepts a certain paginate expression visitor.
     * 
     * @param {PaginateExpressionVisitor<TResult>} paginateExpressionVisitor Paginate expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Paginate expression visitor result.
     */
    public accept<TResult>(paginateExpressionVisitor: PaginateExpressionVisitor<TResult>): TResult
    {
        return paginateExpressionVisitor.visitCursorPaginateExpression(this);
    }
}
