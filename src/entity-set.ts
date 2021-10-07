import { TypeMetadata } from '@dipscope/type-manager/core';

import { IncludeQueryCommandBuilder } from './command-builders/include-query-command-builder';
import { OrderQueryCommandBuilder } from './command-builders/order-query-command-builder';
import { QueryCommandBuilder } from './command-builders/query-command-builder';
import { Criteria } from './criteria';
import { Entity } from './entity';
import { EntityProvider } from './entity-provider';
import { FilterClause } from './filter-clause';
import { IncludeClause } from './include-clause';
import { OrderClause } from './order-clause';

/**
 * Entity set which allows manipulations over certain entity type.
 * 
 * @type {EntitySet<TEntity>}
 */
export class EntitySet<TEntity extends Entity> 
{
    /**
     * Entity type metadata.
     * 
     * @type {TypeMetadata<TEntity>}
     */
    public readonly typeMetadata: TypeMetadata<TEntity>;

    /**
     * Entity provider.
     * 
     * @type {EntityProvider}
     */
    public readonly entityProvider: EntityProvider;

    /**
     * Constructor.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Entity type metadata.
     * @param {EntityProvider} entityProvider Entity provider.
     */
    public constructor(typeMetadata: TypeMetadata<TEntity>, entityProvider: EntityProvider) 
    {
        this.typeMetadata = typeMetadata;
        this.entityProvider = entityProvider;

        return;
    }

    /**
     * Filters entity set.
     * 
     * @param {FilterClause<TEntity>} filterClause Filter clause.
     * 
     * @returns {QueryCommandBuilder<TEntity>} Query command builder.
     */
    public where(filterClause: FilterClause<TEntity>): QueryCommandBuilder<TEntity> 
    {
        return new QueryCommandBuilder<TEntity>(this).where(filterClause);
    }

    /**
     * Orders entity set.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderQueryCommandBuilder<TEntity>} Order query command builder.
     */
    public orderBy<TProperty>(orderClause: OrderClause<TEntity, TProperty>): OrderQueryCommandBuilder<TEntity>
    {
        return new QueryCommandBuilder<TEntity>(this).orderBy(orderClause);
    }

    /**
     * Includes entity for eager loading.
     * 
     * @param {IncludeClause<TEntity, TProperty>} includeClause Include clause.
     * 
     * @returns {IncludeQueryCommandBuilder<TEntity, TProperty>} Include query command builder.
     */
    public include<TProperty>(includeClause: IncludeClause<TEntity, TProperty>): IncludeQueryCommandBuilder<TEntity, TProperty>
    {
        return new QueryCommandBuilder<TEntity>(this).include(includeClause);
    }
    
    public matching(criteria: Criteria): void {}
    public create(entity: TEntity): void {}
    public update(entity: TEntity): void {}
    public save(entity: TEntity): void {}
    public delete(entity: TEntity): void {}
    public findAll(): void {}
    public findOne(): void {}
}
