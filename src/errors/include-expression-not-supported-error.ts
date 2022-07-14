import { EntityStoreError } from '../entity-store-error';
import { IncludeExpression } from '../include-expression';
import { IncludeExpressionVisitor } from '../include-expression-visitor';

/**
 * Error thrown when some include expression is not supported by include expression visitor.
 *
 * @type {IncludeExpressionNotSupportedError}
 */
export class IncludeExpressionNotSupportedError extends EntityStoreError
{
    /**
     * Include expression which is not supported.
     *
     * @type {IncludeExpression}
     */
    public readonly includeExpression: IncludeExpression;

    /**
     * Include expression visitor which cannot visit an expression.
     *
     * @type {IncludeExpressionVisitor<any>}
     */
    public readonly includeExpressionVisitor: IncludeExpressionVisitor<any>;

    /**
     * Constructor.
     *
     * @param {IncludeExpression} includeExpression Include expression which is not supported.
     * @param {IncludeExpressionVisitor<any>} includeExpressionVisitor Include expression visitor which cannot visit an expression.
     */
    public constructor(includeExpression: IncludeExpression, includeExpressionVisitor: IncludeExpressionVisitor<any>)
    {
        super('Provided include expression is not supported by target include expression visitor.');

        Object.setPrototypeOf(this, new.target.prototype);

        this.includeExpression = includeExpression;
        this.includeExpressionVisitor = includeExpressionVisitor;

        return;
    }
}
