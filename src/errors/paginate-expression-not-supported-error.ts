import { EntityStoreError } from '../entity-store-error';
import { PaginateExpression } from '../paginate-expression';
import { PaginateExpressionVisitor } from '../paginate-expression-visitor';

/**
 * Error thrown when some paginate expression is not supported by paginate expression visitor.
 *
 * @type {PaginateExpressionNotSupportedError}
 */
export class PaginateExpressionNotSupportedError extends EntityStoreError
{
    /**
     * Paginate expression which is not supported.
     *
     * @type {PaginateExpression}
     */
    public readonly paginateExpression: PaginateExpression;

    /**
     * Paginate expression visitor which cannot visit an expression.
     *
     * @type {PaginateExpressionVisitor<any>}
     */
    public readonly paginateExpressionVisitor: PaginateExpressionVisitor<any>;

    /**
     * Constructor.
     *
     * @param {PaginateExpression} paginateExpression Paginate expression which is not supported.
     * @param {PaginateExpressionVisitor<any>} paginateExpressionVisitor Paginate expression visitor which cannot visit an expression.
     */
    public constructor(paginateExpression: PaginateExpression, paginateExpressionVisitor: PaginateExpressionVisitor<any>)
    {
        super('Provided paginate expression is not supported by target paginate expression visitor.');

        Object.setPrototypeOf(this, new.target.prototype);

        this.paginateExpression = paginateExpression;
        this.paginateExpressionVisitor = paginateExpressionVisitor;

        return;
    }
}
