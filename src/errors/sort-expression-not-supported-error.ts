import { EntityStoreError } from '../entity-store-error';
import { SortExpression } from '../sort-expression';
import { SortExpressionVisitor } from '../sort-expression-visitor';

/**
 * Error thrown when some sort expression is not supported by sort expression visitor.
 *
 * @type {SortExpressionNotSupportedError}
 */
export class SortExpressionNotSupportedError extends EntityStoreError
{
    /**
     * Sort expression which is not supported.
     *
     * @type {SortExpression}
     */
    public readonly sortExpression: SortExpression;

    /**
     * Sort expression visitor which cannot visit an expression.
     *
     * @type {SortExpressionVisitor<any>}
     */
    public readonly sortExpressionVisitor: SortExpressionVisitor<any>;

    /**
     * Constructor.
     *
     * @param {SortExpression} sortExpression Sort expression which is not supported.
     * @param {SortExpressionVisitor<any>} sortExpressionVisitor Sort expression visitor which cannot visit an expression.
     */
    public constructor(sortExpression: SortExpression, sortExpressionVisitor: SortExpressionVisitor<any>)
    {
        super('Provided sort expression is not supported by target sort expression visitor.');

        Object.setPrototypeOf(this, new.target.prototype);

        this.sortExpression = sortExpression;
        this.sortExpressionVisitor = sortExpressionVisitor;

        return;
    }
}
