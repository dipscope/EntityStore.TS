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
     * Parent order expression. This one will be present when «thenOrderBy» method
     * is called on query command builder.
     * 
     * @type {OrderExpression}
     */
    public readonly parentOrderExpression?: OrderExpression;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {OrderDirection} orderDirection Order direction of attached property.
     * @param {OrderExpression} parentOrderExpression Parent order expression.
     */
    public constructor(propertyInfo: PropertyInfo<any>, orderDirection: OrderDirection, parentOrderExpression?: OrderExpression)
    {
        super();

        this.propertyInfo = propertyInfo;
        this.orderDirection = orderDirection;
        this.parentOrderExpression = parentOrderExpression;

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
