import { EntityInfo } from '../entity-info';
import { Expression } from '../expression';
import { ExpressionVisitor } from '../expression-visitor';
import { PropertyInfo } from '../property-info';

/**
 * Include expression.
 * 
 * @type {IncludeExpression}
 */
export class IncludeExpression extends Expression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Parent include expression. This one will be present when «thenInclude» method
     * is called on query command builder.
     * 
     * @type {IncludeExpression}
     */
    public readonly parentIncludeExpression?: IncludeExpression;

    /**
     * Entity info. This one will be present when including started 
     * from entity root.
     * 
     * @type {EntityInfo<any>}
     */
    public readonly entityInfo?: EntityInfo<any>;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     * @param {IncludeExpression} parentIncludeExpression Parent include expression.
     * @param {EntityInfo<any>} entityInfo Entity info.
     */
    public constructor(propertyInfo: PropertyInfo<any>, parentIncludeExpression?: IncludeExpression, entityInfo?: EntityInfo<any>)
    {
        super();

        this.propertyInfo = propertyInfo;
        this.parentIncludeExpression = parentIncludeExpression;
        this.entityInfo = entityInfo;

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
        return expressionVisitor.visitIncludeExpression(this);
    }
}
