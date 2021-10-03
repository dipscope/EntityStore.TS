import { Expression } from '../expression';
import { ExpressionVisitor } from '../expression-visitor';
import { OrderDirection } from '../order-direction';
import { PropertyInfo } from '../property-info';

/**
 * Order expression defines a property based on which entity collection should be sorted.
 * 
 * @type {OrderExpression}
 */
export class OrderExpression extends Expression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Order direction of attached property.
     * 
     * @type {OrderDirection}
     */
    public readonly orderDirection: OrderDirection;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {OrderDirection} orderDirection Order direction of attached property.
     */
    public constructor(propertyInfo: PropertyInfo<any>, orderDirection: OrderDirection)
    {
        super();

        this.propertyInfo = propertyInfo;
        this.orderDirection = orderDirection;

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
        return expressionVisitor.visitOrderExpression(this);
    }
}
