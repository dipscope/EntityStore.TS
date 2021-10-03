import { Command } from '../command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';

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
    public readonly whereExpressions: ReadonlyArray<WhereExpression>;
    public readonly orderByExpressions: ReadonlyArray<OrderByExpression>;
    public readonly includeExpressions: ReadonlyArray<IncludeExpression>;
    public readonly offset?: number;
    public readonly limit?: number;

    public constructor(
        entityInfo: EntityInfo<TEntity>,
        whereExpressions: ReadonlyArray<WhereExpression>,
        orderByExpressions: ReadonlyArray<OrderByExpression>,
        includeExpressions: ReadonlyArray<IncludeExpression>,
        offset?: number,
        limit?: number
    ) 
    {
        super();

        this.entityInfo = entityInfo;
        this.whereExpressions = whereExpressions;
        this.orderByExpressions = orderByExpressions;
        this.includeExpressions = includeExpressions;
        this.offset = offset;
        this.limit = limit;

        return;
    }

    public delegate(entityProvider: EntityProvider): EntityCollection<TEntity>
    {
        return entityProvider.executeQueryCommand(this);
    }
}