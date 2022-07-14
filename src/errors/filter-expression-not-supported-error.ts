import { EntityStoreError } from '../entity-store-error';
import { FilterExpression } from '../filter-expression';
import { FilterExpressionVisitor } from '../filter-expression-visitor';

/**
 * Error thrown when some filter expression is not supported by filter expression visitor.
 *
 * @type {FilterExpressionNotSupportedError}
 */
export class FilterExpressionNotSupportedError extends EntityStoreError
{
    /**
     * Filter expression which is not supported.
     *
     * @type {FilterExpression}
     */
    public readonly filterExpression: FilterExpression;

    /**
     * Filter expression visitor which cannot visit an expression.
     *
     * @type {FilterExpressionVisitor<any>}
     */
    public readonly filterExpressionVisitor: FilterExpressionVisitor<any>;

    /**
     * Constructor.
     *
     * @param {FilterExpression} filterExpression Filter expression which is not supported.
     * @param {FilterExpressionVisitor<any>} filterExpressionVisitor Filter expression visitor which cannot visit an expression.
     */
    public constructor(filterExpression: FilterExpression, filterExpressionVisitor: FilterExpressionVisitor<any>)
    {
        super('Provided filter expression is not supported by target filter expression visitor.');

        Object.setPrototypeOf(this, new.target.prototype);

        this.filterExpression = filterExpression;
        this.filterExpressionVisitor = filterExpressionVisitor;

        return;
    }
}
