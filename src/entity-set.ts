import { TypeMetadata } from '@dipscope/type-manager/core';

import { Criteria } from './criteria';
import { EntityProvider } from './entity-provider';
import { IncludeClause, OrderByClause, QueryBuilder, WhereClause } from './query-builder';

export class EntitySet<TEntity> 
{
    public readonly typeMetadata: TypeMetadata<TEntity>;
    public readonly entityProvider: EntityProvider;

    public constructor(typeMetadata: TypeMetadata<TEntity>, entityProvider: EntityProvider) 
    {
        this.typeMetadata = typeMetadata;
        this.entityProvider = entityProvider;

        return;
    }

    public where(whereClause: WhereClause<TEntity>): QueryBuilder<TEntity> 
    {
        return new QueryBuilder<TEntity>(this).where(whereClause);
    }

    public orderBy(orderByClause: OrderByClause<TEntity>): QueryBuilder<TEntity> // OrderedQueryBuilder
    {
        return new QueryBuilder<TEntity>(this).orderBy(orderByClause);
    }

    public include(includeClause: IncludeClause<TEntity>): QueryBuilder<TEntity> // EagerQueryBuilder
    {
        return new QueryBuilder<TEntity>(this).include(includeClause);
    }


    public matching(criteria: Criteria): void {}
    public create(entity: TEntity): void {}
    public update(entity: TEntity): void {}
    public save(entity: TEntity): void {}
    public delete(entity: TEntity): void {}
    public findAll(): void {}
    public findOne(): void {}
}
