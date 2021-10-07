import { ExpressionVisitor } from '../expression-visitor';
import { PropertyInfo } from '../property-info';
import { IncludeExpression } from './include-expression';

/**
 * Eager loading expression defines a property which should be eager loaded.
 * 
 * @type {EagerLoadingExpression}
 */
export class EagerLoadingExpression extends IncludeExpression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Parent include expression. This one will be present when «thenInclude» method
     * is called on query command builder.
     * 
     * @type {IncludeExpression}
     */
    public readonly parentIncludeExpression?: IncludeExpression;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {IncludeExpression} parentIncludeExpression Parent include expression.
     */
    public constructor(propertyInfo: PropertyInfo<any>, parentIncludeExpression?: IncludeExpression)
    {
        super();

        this.propertyInfo = propertyInfo;
        this.parentIncludeExpression = parentIncludeExpression;

        return;
    }

    /**
     * Accepts a certain expression visitor.
     * 
     * @param {ExpressionVisitor<TResult>} expressionVisitor Expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Expression visitor result.
     */
    public accept<TResult>(expressionVisitor: ExpressionVisitor<TResult>): TResult
    {
        return expressionVisitor.visitEagerLoadingExpression(this);
    }
}
