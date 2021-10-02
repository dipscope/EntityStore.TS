import { Expression } from '../expression';
import { ExpressionVisitor } from '../expression-visitor';
import { PropertyInfo } from '../property-info';

/**
 * Equal expression.
 * 
 * @type {EqExpression}
 */
export class EqExpression extends Expression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Value to which attached property info equals.
     * 
     * @type {any}
     */
    public readonly value: any;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {any} value Value to which attached property info equals.
     */
    public constructor(propertyInfo: PropertyInfo<any>, value: any)
    {
        super();

        this.propertyInfo = propertyInfo;
        this.value = value;

        return;
    }

    public accept(expressionVisitor: ExpressionVisitor): any
    {
        return expressionVisitor.visitEqExpression(this);
    }
}