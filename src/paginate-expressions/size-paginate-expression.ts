import { EntityInfo } from '../entity-info';
import { PaginateExpression } from '../paginate-expression';
import { PaginateExpressionVisitor } from '../paginate-expression-visitor';

/**
 * Represents a size based expression which is used to paginate entities.
 * 
 * @type {SizePaginateExpression}
 */
export class SizePaginateExpression extends PaginateExpression
{
    /**
     * Which page of size based pagination to take.
     * 
     * @type {number}
     */
    public readonly page?: number;
    
    /**
     * Size of the one page.
     * 
     * @type {number}
     */
    public readonly size?: number;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<any>} entityInfo Entity info.
     * @param {number} page Which page of size based pagination to take.
     * @param {number} size Size of the one page.
     */
    public constructor(entityInfo: EntityInfo<any>, page?: number, size?: number)
    {
        super(entityInfo);

        this.page = page;
        this.size = size;

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
        return paginateExpressionVisitor.visitSizePaginateExpression(this);
    }
}
