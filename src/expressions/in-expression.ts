import { ExpressionVisitor } from '../expression-visitor';
import { PropertyInfo } from '../property-info';
import { FilterExpression } from './filter-expression';

/**
 * In expression.
 * 
 * @type {InExpression}
 */
export class InExpression extends FilterExpression
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
        super();

        this.propertyInfo = propertyInfo;
        this.values = values;

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
        return expressionVisitor.visitInExpression(this);
    }
}
