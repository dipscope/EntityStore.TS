import { EntityInfo } from '../entity-info';
import { PaginateExpression } from '../paginate-expression';
import { PaginateExpressionVisitor } from '../paginate-expression-visitor';

/**
 * Represents an offset based expression which is used to paginate entities.
 * 
 * @type {OffsetPaginateExpression}
 */
export class OffsetPaginateExpression extends PaginateExpression
{
    /**
     * How much entities to skip before paging.
     * 
     * @type {number}
     */
    public readonly offset?: number;

    /**
     * How much entities to take per page.
     * 
     * @type {number}
     */
    public readonly limit?: number;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<any>} entityInfo Entity info.
     * @param {number} offset How much entities to skip before paging.
     * @param {number} limit How much entities to take per page.
     */
    public constructor(entityInfo: EntityInfo<any>, offset?: number, limit?: number)
    {
        super(entityInfo);

        this.offset = offset;
        this.limit = limit;

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
        return paginateExpressionVisitor.visitOffsetPaginateExpression(this);
    }
}
