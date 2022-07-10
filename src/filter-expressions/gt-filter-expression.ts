import { FilterExpressionVisitor } from '../filter-expression-visitor';
import { PropertyInfo } from '../property-info';
import { PropertyFilterExpression } from './property-filter-expression';

/**
 * Greater than filter expression.
 * 
 * @type {GtFilterExpression}
 */
export class GtFilterExpression extends PropertyFilterExpression
{
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
        super(propertyInfo);

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
        return filterExpressionVisitor.visitGtFilterExpression(this);
    }
}
