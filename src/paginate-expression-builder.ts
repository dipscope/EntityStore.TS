import { Cursor } from './cursor';
import { Entity } from './entity';
import { EntityInfo } from './entity-info';
import { CursorPaginateExpression } from './paginate-expressions';
import { OffsetPaginateExpression } from './paginate-expressions/offset-paginate-expression';
import { SizePaginateExpression } from './paginate-expressions/size-paginate-expression';

/**
 * Builder used to build paginate expressions.
 * 
 * @type {PaginateExpressionBuilder<TEntity>}
 */
export class PaginateExpressionBuilder<TEntity extends Entity>
{
    /**
     * Entity info.
     * 
     * @type {EntityInfo<TEntity>}
     */
    public readonly entityInfo: EntityInfo<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     */
    public constructor(entityInfo: EntityInfo<TEntity>)
    {
        this.entityInfo = entityInfo;

        return;
    }

    /**
     * Builds offset based paginate expression.
     * 
     * @param {number} offset Offset to apply.
     * 
     * @returns {OffsetPaginateExpression} Offset paginate expression.
     */
    public offset(offset: number): OffsetPaginateExpression
    {
        return new OffsetPaginateExpression(this.entityInfo, offset, undefined);
    }

    /**
     * Builds limit based paginate expression.
     * 
     * @param {number} limit Limit to apply.
     * 
     * @returns {OffsetPaginateExpression} Offset paginate expression.
     */
    public limit(limit: number): OffsetPaginateExpression
    {
        return new OffsetPaginateExpression(this.entityInfo, undefined, limit);
    }

    /**
     * Builds offset limit based paginate expression.
     * 
     * @param {number} offset Offset to apply.
     * @param {number} limit Limit to apply.
     * 
     * @returns {OffsetPaginateExpression} Offset paginate expression.
     */
    public offsetLimit(offset: number, limit: number): OffsetPaginateExpression
    {
        return new OffsetPaginateExpression(this.entityInfo, offset, limit);
    }

    /**
     * Builds page based paginate expression.
     * 
     * @param {number} page Page to take.
     * 
     * @returns {SizePaginateExpression} Size paginate expression.
     */
    public page(page: number): SizePaginateExpression
    {
        return new SizePaginateExpression(this.entityInfo, page, undefined);
    }

    /**
     * Builds size based paginate expression.
     * 
     * @param {number} size Size to apply.
     * 
     * @returns {SizePaginateExpression} Size paginate expression.
     */
    public size(size: number): SizePaginateExpression
    {
        return new SizePaginateExpression(this.entityInfo, undefined, size);
    }

    /**
     * Builds page size based paginate expression.
     * 
     * @param {number} page Page to take.
     * @param {number} size Size to apply.
     * 
     * @returns {SizePaginateExpression} Size paginate expression.
     */
    public pageSize(page: number, size: number): SizePaginateExpression
    {
        return new SizePaginateExpression(this.entityInfo, page, size);
    }

    /**
     * Builds cursor based paginate expression.
     * 
     * @param {number} take Number to take.
     * 
     * @returns {CursorPaginateExpression} Cursor paginate expression.
     */
    public take(take: number): CursorPaginateExpression
    {
        return new CursorPaginateExpression(this.entityInfo, take, undefined, undefined);
    }

    /**
     * Builds cursor based paginate expression.
     * 
     * @param {number} take Number of entities to take.
     * @param {number} afterCursor Cursor after which to take entities.
     * 
     * @returns {CursorPaginateExpression} Cursor paginate expression.
     */
    public takeAfterCursor(take: number, afterCursor: Cursor): CursorPaginateExpression
    {
        return new CursorPaginateExpression(this.entityInfo, take, afterCursor, undefined);
    }

    /**
     * Builds cursor based paginate expression.
     * 
     * @param {number} take Number of entities to take.
     * @param {number} beforeCursor Cursor before which to take entities.
     * 
     * @returns {CursorPaginateExpression} Cursor paginate expression.
     */
    public takeBeforeCursor(take: number, beforeCursor: Cursor): CursorPaginateExpression
    {
        return new CursorPaginateExpression(this.entityInfo, take, undefined, beforeCursor);
    }

    /**
     * Builds cursor based paginate expression.
     * 
     * @param {number} afterCursor Cursor after which to take entities.
     * @param {number} beforeCursor Cursor before which to take entities.
     * 
     * @returns {CursorPaginateExpression} Cursor paginate expression.
     */
    public takeBetweenCursors(afterCursor: Cursor, beforeCursor: Cursor): CursorPaginateExpression
    {
        return new CursorPaginateExpression(this.entityInfo, undefined, afterCursor, beforeCursor);
    }
}
