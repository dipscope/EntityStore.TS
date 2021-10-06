import { Command } from '../command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { FilterExpression } from '../expressions/filter-expression';
import { IncludeExpression } from '../expressions/include-expression';
import { OrderExpression } from '../expressions/order-expression';

/**
 * Command to query a collection of entities.
 * 
 * @type {QueryCommand<TEntity>}
 */
export class QueryCommand<TEntity extends Entity> extends Command<EntityCollection<TEntity>>
{
    /**
     * Entity info.
     * 
     * @type {EntityInfo<TEntity>}
     */
    public readonly entityInfo: EntityInfo<TEntity>;

    /**
     * Filter expression.
     * 
     * @type {FilterExpression}
     */
    public readonly filterExpression?: FilterExpression;

    /**
     * Order expression.
     * 
     * @type {OrderExpression}
     */
    public readonly orderExpression?: OrderExpression;

    /**
     * Include expression.
     * 
     * @type {IncludeExpression}
     */
    public readonly includeExpression?: IncludeExpression;

    /**
     * Entity collection offset.
     * 
     * @type {number}
     */
    public readonly offset?: number;

    /**
     * Entity collection limit.
     * 
     * @type {number}
     */
    public readonly limit?: number;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {OrderExpression} orderExpression Order expressions.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {number} offset Entity collection offset.
     * @param {number} limit Entity collection limit.
     */
    public constructor(
        entityInfo: EntityInfo<TEntity>,
        filterExpression?: FilterExpression,
        orderExpression?: OrderExpression,
        includeExpression?: IncludeExpression,
        offset?: number,
        limit?: number
    )
    {
        super();

        this.entityInfo = entityInfo;
        this.filterExpression = filterExpression;
        this.orderExpression = orderExpression;
        this.includeExpression = includeExpression;
        this.offset = offset;
        this.limit = limit;

        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {EntityCollection<TEntity>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): EntityCollection<TEntity>
    {
        return entityProvider.executeQueryCommand(this);
    }
}
