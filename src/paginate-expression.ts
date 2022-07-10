import { EntityInfo } from './entity-info';
import { PaginateExpressionVisitor } from './paginate-expression-visitor';

/**
 * Represents an expression which is used to paginate entities.
 * 
 * @type {PaginateExpression}
 */
export abstract class PaginateExpression
{
    /**
     * Entity info.
     * 
     * @type {EntityInfo<any>}
     */
    public readonly entityInfo: EntityInfo<any>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     */
    public constructor(entityInfo: EntityInfo<any>)
    {
        this.entityInfo = entityInfo;

        return;
    }

    /**
     * Accepts a certain paginate expression visitor.
     * 
     * @param {PaginateExpressionVisitor<TResult>} paginateExpressionVisitor Paginate expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Paginate expression visitor result.
     */
    public abstract accept<TResult>(paginateExpressionVisitor: PaginateExpressionVisitor<TResult>): TResult;
}
