import { Entity } from './entity';
import { EntityInfoProxyRoot } from './entity-info-proxy';
import { FilterExpression } from './expressions/filter-expression';
import { FilterExpressionBuilder } from './filter-expression-builder';

/**
 * Represents a clause to build a filter expression for entities.
 * 
 * @type {FilterClause<TEntity>}
 */
export type FilterClause<TEntity extends Entity> = (entityInfoProxyRoot: EntityInfoProxyRoot<TEntity>, filterExpressionBuilder: FilterExpressionBuilder) => FilterExpression;
