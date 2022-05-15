import { EntityInfo } from './entity-info';
import { PaginateExpressionVisitor } from './paginate-expression-visitor';

/**
 * Represents an expression which is used to paginate entities.
 * 
 * @type {PaginateExpression}
 */
export class PaginateExpression
{
    /**
     * Entity info.
     * 
     * @type {EntityInfo<any>}
     */
    public readonly entityInfo: EntityInfo<any>;

    /**
     * How much entities to skip before paging.
     * 
     * @type {number}
     */
    public readonly skip?: number;
    
    /**
     * How much entities to take per page.
     * 
     * @type {number}
     */
    public readonly take?: number;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<any>} entityInfo Entity info.
     * @param {number} skip How much entities to skip before paging.
     * @param {number} take How much entities to take per page.
     */
    public constructor(entityInfo: EntityInfo<any>, skip?: number, take?: number)
    {
        this.entityInfo = entityInfo;
        this.skip = skip;
        this.take = take;

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
        return paginateExpressionVisitor.visitPaginateExpression(this);
    }
}
