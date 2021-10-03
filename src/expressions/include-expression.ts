import { Expression } from '../expression';
import { ExpressionVisitor } from '../expression-visitor';
import { PropertyInfo } from '../property-info';

/**
 * Include expression defines a property which should be eager loaded.
 * 
 * @type {IncludeExpression}
 */
export class IncludeExpression extends Expression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     */
    public constructor(propertyInfo: PropertyInfo<any>)
    {
        super();

        this.propertyInfo = propertyInfo;

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
        return expressionVisitor.visitIncludeExpression(this);
    }
}
