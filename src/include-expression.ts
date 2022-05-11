import { EntityInfo } from './entity-info';
import { IncludeExpressionVisitor } from './include-expression-visitor';
import { PropertyInfo } from './property-info';

/**
 * Expression to include navigation properties of entities.
 * 
 * @type {IncludeExpression}
 */
export class IncludeExpression
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
        this.propertyInfo = propertyInfo;
        this.parentIncludeExpression = parentIncludeExpression;
        this.entityInfo = entityInfo;

        return;
    }

    /**
     * Accepts a certain include expression visitor.
     * 
     * @param {IncludeExpressionVisitor<TResult>} includeExpressionVisitor Include expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Include expression visitor result.
     */
    public accept<TResult>(includeExpressionVisitor: IncludeExpressionVisitor<TResult>): TResult
    {
        return includeExpressionVisitor.visitIncludeExpression(this);
    }
}