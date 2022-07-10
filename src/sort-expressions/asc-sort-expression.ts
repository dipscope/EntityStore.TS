import { PropertyInfo } from '../property-info';
import { SortExpression } from '../sort-expression';
import { SortExpressionVisitor } from '../sort-expression-visitor';

/**
 * Represents asc sort epression which is used to sort entities.
 * 
 * @type {AscSortExpression}
 */
export class AscSortExpression extends SortExpression
{
    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {SortExpression} parentSortExpression Parent sort expression.
     */
    public constructor(propertyInfo: PropertyInfo<any>, parentSortExpression?: SortExpression)
    {
        super(propertyInfo, parentSortExpression);

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
        return sortExpressionVisitor.visitAscSortExpression(this);
    }
}
