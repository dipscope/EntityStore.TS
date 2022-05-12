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
     * Offset to apply.
     * 
     * @type {number}
     */
    public readonly offset?: number;

     /**
      * Limit to apply.
      * 
      * @type {number}
      */
    public readonly limit?: number;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<any>} entityInfo Entity info.
     * @param {number} offset Offset to apply.
     * @param {number} limit Limit to apply.
     */
    public constructor(entityInfo: EntityInfo<any>, offset?: number, limit?: number)
    {
        this.entityInfo = entityInfo;
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
        return paginateExpressionVisitor.visitPaginateExpression(this);
    }
}
