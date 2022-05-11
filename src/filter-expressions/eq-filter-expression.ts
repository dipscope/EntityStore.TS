import { FilterExpression } from '../filter-expression';
import { FilterExpressionVisitor } from '../filter-expression-visitor';
import { PropertyInfo } from '../property-info';

/**
 * Equal filter expression.
 * 
 * @type {EqFilterExpression}
 */
export class EqFilterExpression implements FilterExpression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Expression value.
     * 
     * @type {any}
     */
    public readonly value: any;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {any} value Expression value.
     */
    public constructor(propertyInfo: PropertyInfo<any>, value: any)
    {
        this.propertyInfo = propertyInfo;
        this.value = value;

        return;
    }
    
    /**
     * Accepts a certain filter expression visitor.
     * 
     * @param {FilterExpressionVisitor<TResult>} filterExpressionVisitor Filter expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Filter expression visitor result.
     */
    public accept<TResult>(filterExpressionVisitor: FilterExpressionVisitor<TResult>): TResult
    {
        return filterExpressionVisitor.visitEqFilterExpression(this);
    }
}
