import { TypeMetadata } from '@dipscope/type-manager/core';

import { EntityInfo } from '../entity-info';
import { EntityInfoProxy } from '../entity-info-proxy';
import { EntityInfoProxyHandler } from '../entity-info-proxy-handler';
import { EntitySet } from '../entity-set';
import { Expression } from '../expression';
import { ExpressionBuilder } from '../expression-builder';
import { IncludeExpression } from '../expressions/include-expression';
import { OrderByExpression } from '../expressions/order-expression';
import { WhereClause } from '../filter-clause';
import { WhereExpression } from '../filter-expression';
import { IncludeClause } from '../include-clause';
import { OrderByClause } from '../order-clause';
import { OrderByDirection } from '../order-direction';
import { IncludeQueryBuilder } from './include-query-command-builder';
import { OrderQueryBuilder } from './order-query-command-builder';
import { Query } from './query-command';

export class QueryCommandBuilder<TEntity>
{
    private entityInfo: EntityInfo<TEntity>;
    private entityInfoProxy: EntityInfoProxy<TEntity>;
    private whereExpressions: Array<WhereExpression>;
    private orderByExpressions: Array<OrderByExpression>;
    private includeExpressions: Array<IncludeExpression>;
    private expressionBuilder: ExpressionBuilder;
    private offset?: number;
    private limit?: number;

    public constructor(entitySet: EntitySet<TEntity>)
    {
        this.entityInfo = new EntityInfo(entitySet.typeMetadata);
        this.entityInfoProxy = new Proxy<EntityInfoProxy<TEntity>>(this.entityInfo as any, new EntityInfoProxyHandler(entitySet.typeMetadata));
        this.whereExpressions = new Array<WhereExpression>();
        this.orderByExpressions = new Array<OrderByExpression>();
        this.includeExpressions = new Array<IncludeExpression>();
        this.expressionBuilder = new ExpressionBuilder();

        return;
    }

    public where(whereClause: WhereClause<TEntity>): QueryBuilder<TEntity>
    {
        const whereExpression = whereClause(this.entityInfoProxy, this.expressionBuilder);

        this.whereExpressions.push(whereExpression);

        return this;
    }

    public orderBy<TProperty>(orderByClause: OrderByClause<TEntity, TProperty>, orderByDirection: OrderByDirection = OrderByDirection.Asc): OrderQueryBuilder<TEntity> 
    {
        const propertyInfoProxy = orderByClause(this.entityInfoProxy);
        const orderByExpression = this.expressionBuilder.orderBy(propertyInfoProxy, orderByDirection);

        this.orderByExpressions.splice(0, this.orderByExpressions.length);
        this.orderByExpressions.push(orderByExpression);

        return new OrderQueryBuilder(this);
    }

    public orderByAsc<TProperty>(orderByClause: OrderByClause<TEntity, TProperty>): OrderQueryBuilder<TEntity> 
    {
        return this.orderBy(orderByClause, OrderByDirection.Asc)
    }

    public orderByDesc<TProperty>(orderByClause: OrderByClause<TEntity, TProperty>): OrderQueryBuilder<TEntity> 
    {
        return this.orderBy(orderByClause, OrderByDirection.Desc)
    }

    public include<TProperty>(includeClause: IncludeClause<TEntity, TProperty>): IncludeQueryBuilder<TEntity, TProperty> 
    {

    }

    public build(): Query<TEntity>
    {
        return new Query(this.entityInfo, this.whereExpressions, this.orderByExpressions, this.includeExpressions, this.offset, this.limit);
    }

    public skip(count: number): QueryBuilder<TEntity>
    {
        this.offset = count;

        return this;
    }

    public take(count: number): QueryBuilder<TEntity>
    {
        this.limit = count;

        return this;
    }

    public findAll(): EntityCollection<TEntity>
    {

    }

    public findOne(): TEntity? 
    {

    }
}
