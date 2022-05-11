import { Command } from '../command';
import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { FilterExpression } from '../filter-expressions/filter-expression';
import { IncludeExpression } from '../filter-expressions/include-expression';
import { OrderExpression } from '../filter-expressions/order-expression';

/**
 * Command to browse an entity collection.
 * 
 * @type {BrowseCommand<TEntity, TResult>}
 */
export abstract class BrowseCommand<TEntity extends Entity, TResult> extends Command<TEntity, TResult>
{
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
        super(entityInfo);
        
        this.filterExpression = filterExpression;
        this.orderExpression = orderExpression;
        this.includeExpression = includeExpression;
        this.offset = offset;
        this.limit = limit;

        return;
    }
}
