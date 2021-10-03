import { TypeMetadata } from '@dipscope/type-manager/core';

import { IncludeQueryBuilder } from '../command-builders/include-query-command-builder';
import { EntityInfo } from './entity-info';
import { EntityInfoProxy } from './entity-info-proxy';
import { EntityInfoProxyHandler } from './entity-info-proxy-handler';
import { EntitySet } from './entity-set';
import { Expression } from './expression';
import { ExpressionBuilder } from './expression-builder';
import { IncludeClause } from './include-clause';
import { IncludeExpression } from './include-expression';
import { OrderByClause } from './order-by-clause';
import { OrderByDirection } from './order-by-direction';
import { OrderByExpression } from './order-by-expression';
import { OrderQueryBuilder } from './order-query-command-builder';
import { WhereClause } from './where-clause';
import { WhereExpression } from './where-expression';

export class QueryCommand<TEntity>
{
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
        this.entityInfo = entityInfo;
        this.whereExpressions = whereExpressions;
        this.orderByExpressions = orderByExpressions;
        this.includeExpressions = includeExpressions;
        this.offset = offset;
        this.limit = limit;

        return;
    }
}