import { EntityInfoProxy } from './entity-info-proxy';
import { ExpressionBuilder } from './expression-builder';
import { WhereExpression } from './expressions/filter-expression';

export type WhereClause<TEntity> = (entityInfoProxy: EntityInfoProxy<TEntity>, expressionBuilder: ExpressionBuilder) => WhereExpression;
