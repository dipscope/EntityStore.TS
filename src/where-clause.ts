import { EntityInfoProxy } from './entity-info-proxy';
import { ExpressionBuilder } from './expression-builder';
import { WhereExpression } from './where-expression';

export type WhereClause<TEntity> = (entityInfoProxy: EntityInfoProxy<TEntity>, expressionBuilder: ExpressionBuilder) => WhereExpression;
