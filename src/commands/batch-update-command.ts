import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { FilterExpression } from '../expressions/filter-expression';
import { IncludeExpression } from '../expressions/include-expression';
import { OrderExpression } from '../expressions/order-expression';
import { BrowseCommand } from './browse-command';

/**
 * Command to update an entity collection based on expressions.
 * 
 * @type {BatchUpdateCommand<TEntity>}
 */
export class BatchUpdateCommand<TEntity extends Entity> extends BrowseCommand<TEntity, void>
{
    /**
     * Entity partial.
     * 
     * @type {Partial<TEntity>}
     */
    public readonly entityPartial: Partial<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {Partial<TEntity>} entityPartial Entity partial.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {OrderExpression} orderExpression Order expressions.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {number} offset Entity collection offset.
     * @param {number} limit Entity collection limit.
     */
    public constructor(
        entityInfo: EntityInfo<TEntity>,
        entityPartial: Partial<TEntity>,
        filterExpression?: FilterExpression,
        orderExpression?: OrderExpression,
        includeExpression?: IncludeExpression,
        offset?: number,
        limit?: number
    )
    {
        super(entityInfo, filterExpression, orderExpression, includeExpression, offset, limit);

        this.entityPartial = entityPartial;

        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<void>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<void>
    {
        return entityProvider.executeBatchUpdateCommand(this);
    }
}
