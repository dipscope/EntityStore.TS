import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { FilterExpression } from '../filter-expressions/filter-expression';
import { IncludeExpression } from '../filter-expressions/include-expression';
import { OrderExpression } from '../filter-expressions/order-expression';
import { Nullable } from '../nullable';
import { BrowseCommand } from './browse-command';

/**
 * Command to query an entity.
 * 
 * @type {QueryCommand<Nullable<TEntity>>}
 */
export class QueryCommand<TEntity extends Entity> extends BrowseCommand<TEntity, Nullable<TEntity>>
{
    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {OrderExpression} orderExpression Order expressions.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {number} offset Entity collection offset.
     */
    public constructor(
        entityInfo: EntityInfo<TEntity>,
        filterExpression?: FilterExpression,
        orderExpression?: OrderExpression,
        includeExpression?: IncludeExpression,
        offset?: number
    )
    {
        super(entityInfo, filterExpression, orderExpression, includeExpression, offset, 1);
        
        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<Nullable<TEntity>>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<Nullable<TEntity>>
    {
        return entityProvider.executeQueryCommand(this);
    }
}
