import { PropertyInfo } from '../property-info';
import { SortExpression } from '../sort-expression';
import { SortExpressionVisitor } from '../sort-expression-visitor';

/**
 * Represents desc sort epression which is used to sort entities.
 * 
 * @type {DescSortExpression}
 */
export class DescSortExpression implements SortExpression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;
    
    /**
     * Parent sort expression. This one will be present when «thenSortBy» method
     * is called on query command builder.
     * 
     * @type {SortExpression}
     */
    public readonly parentSortExpression?: SortExpression;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {OrderExpression} parentSortExpression Parent sort expression.
     */
    public constructor(propertyInfo: PropertyInfo<any>, parentSortExpression?: SortExpression)
    {
        this.propertyInfo = propertyInfo;
        this.parentSortExpression = parentSortExpression;

        return;
    }

    /**
     * Accepts a certain sort expression visitor.
     * 
     * @param {SortExpressionVisitor<TResult>} sortExpressionVisitor Sort expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Sort expression visitor result.
     */
    public accept<TResult>(sortExpressionVisitor: SortExpressionVisitor<TResult>): TResult
    {
        return sortExpressionVisitor.visitDescSortExpression(this);
    }
}
