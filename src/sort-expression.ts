import { PropertyInfo } from './property-info';
import { SortExpressionVisitor } from './sort-expression-visitor';

/**
 * Represents an expression which is used to sort entities.
 * 
 * @type {SortExpression}
 */
export abstract class SortExpression
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
     * @param {SortExpression} parentSortExpression Parent sort expression.
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
    public abstract accept<TResult>(sortExpressionVisitor: SortExpressionVisitor<TResult>): TResult;
}
