import { TypeMetadata } from '@dipscope/type-manager/core';

import { EntityInfo } from './entity-info';
import { EntityInfoProxy } from './entity-info-proxy';
import { EntityInfoProxyHandler } from './entity-info-proxy-handler';
import { EntitySet } from './entity-set';
import { Expression } from './expression';
import { ExpressionBuilder } from './expression-builder';
import { IncludeClause } from './include-clause';
import { IncludeExpression } from './include-expression';
import { IncludeQueryBuilder } from './include-query-builder';
import { OrderByClause } from './order-by-clause';
import { OrderByDirection } from './order-by-direction';
import { OrderByExpression } from './order-by-expression';
import { OrderQueryBuilder } from './order-query-builder';
import { WhereClause } from './where-clause';
import { WhereExpression } from './where-expression';

export class QueryBuilder<TEntity>
{
    public readonly entityInfo: EntityInfo<TEntity>;
    public readonly entityInfoProxy: EntityInfoProxy<TEntity>;
    public readonly whereExpressions: Array<WhereExpression>;
    public readonly orderByExpressions: Array<OrderByExpression>;
    public readonly includeExpressions: Array<IncludeExpression>;
    public readonly expressionBuilder: ExpressionBuilder;

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

    // public findAll(): EntityCollection<TEntity>
    // {

    // }

    // public findOne(): TEntity? 
    // {

    // }
}
