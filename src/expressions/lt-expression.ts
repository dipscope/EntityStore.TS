import { ExpressionVisitor } from '../expression-visitor';
import { PropertyInfo } from '../property-info';
import { FilterExpression } from './filter-expression';

/**
 * Lower than expression.
 * 
 * @type {LtExpression}
 */
export class LtExpression extends FilterExpression
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
        return expressionVisitor.visitLtExpression(this);
    }
}
