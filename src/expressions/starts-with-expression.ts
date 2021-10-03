import { ExpressionVisitor } from '../expression-visitor';
import { PropertyInfo } from '../property-info';
import { FilterExpression } from './filter-expression';

/**
 * Starts with expression.
 * 
 * @type {StartsWithExpression}
 */
export class StartsWithExpression extends FilterExpression
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
        super();

        this.propertyInfo = propertyInfo;
        this.value = value;

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
        return expressionVisitor.visitStartsWithExpression(this);
    }
}
