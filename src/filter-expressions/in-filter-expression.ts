import { FilterExpression } from '../filter-expression';
import { FilterExpressionVisitor } from '../filter-expression-visitor';
import { PropertyInfo } from '../property-info';

/**
 * In filter expression.
 * 
 * @type {InFilterExpression}
 */
export class InFilterExpression implements FilterExpression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Expression values.
     * 
     * @type {ReadonlyArray<any>}
     */
    public readonly values: ReadonlyArray<any>;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {ReadonlyArray<any>} values Expression values.
     */
    public constructor(propertyInfo: PropertyInfo<any>, values: ReadonlyArray<any>)
    {
        this.propertyInfo = propertyInfo;
        this.values = values;

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
        return filterExpressionVisitor.visitInFilterExpression(this);
    }
}
