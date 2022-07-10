import { FilterExpressionVisitor } from '../filter-expression-visitor';
import { PropertyInfo } from '../property-info';
import { PropertyFilterExpression } from './property-filter-expression';

/**
 * Not in filter expression.
 * 
 * @type {NotInFilterExpression}
 */
export class NotInFilterExpression extends PropertyFilterExpression
{
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
        super(propertyInfo);
        
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
        return filterExpressionVisitor.visitNotInFilterExpression(this);
    }
}
