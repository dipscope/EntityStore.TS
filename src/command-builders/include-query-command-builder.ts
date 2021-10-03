import { TypeMetadata } from '@dipscope/type-manager/core';

import { EntityInfo } from '../entity-info';
import { EntityInfoProxy } from '../entity-info-proxy';
import { EntitySet } from '../entity-set';
import { Expression } from '../expression';
import { ExpressionBuilder } from '../expression-builder';
import { WhereClause } from '../filter-clause';
import { QueryBuilder } from './query-command-builder';

export class IncludeQueryBuilder<TEntity, TProperty> extends QueryBuilder<TEntity> 
{
    public constructor(queryBuilder: QueryBuilder<TEntity>) 
    {
        super(queryBuilder.entitySet);
    }

    public thenInclude(): void {}
}
