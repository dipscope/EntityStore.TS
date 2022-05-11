import { FilterExpression } from '../filter-expression';
import { FilterExpressionVisitor } from '../filter-expression-visitor';
import { PropertyInfo } from '../property-info';

/**
 * Not starts with filter expression.
 * 
 * @type {NotStartsWithFilterExpression}
 */
export class NotStartsWithFilterExpression implements FilterExpression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<string>}
     */
    public readonly propertyInfo: PropertyInfo<string>;

    /**
     * Expression value.
     * 
     * @type {string}
     */
    public readonly value: string;
    
    /**
     * Constructor.
     * 
     * @param {PropertyInfo<string>} propertyInfo Property info attached to expression.
     * @param {string} value Expression value.
     */
    public constructor(propertyInfo: PropertyInfo<string>, value: string)
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
        return filterExpressionVisitor.visitNotStartsWithFilterExpression(this);
    }
}
