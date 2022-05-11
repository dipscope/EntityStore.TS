import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { FilterExpression } from '../filter-expressions/filter-expression';
import { IncludeExpression } from '../filter-expressions/include-expression';
import { OrderExpression } from '../filter-expressions/order-expression';
import { BrowseCommand } from './browse-command';

/**
 * Command to query an entity collection.
 * 
 * @type {BulkQueryCommand<TEntity>}
 */
export class BulkQueryCommand<TEntity extends Entity> extends BrowseCommand<TEntity, EntityCollection<TEntity>>
{
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
        super(entityInfo, filterExpression, orderExpression, includeExpression, offset, limit);
        
        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<EntityCollection<TEntity>>
    {
        return entityProvider.executeBulkQueryCommand(this);
    }
}
