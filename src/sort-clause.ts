import { Entity } from './entity';
import { EntityInfoProxyRoot } from './entity-info-proxy';
import { PropertyInfoProxy } from './property-info-proxy';

/**
 * Represents a clause to build a sort expression.
 * 
 * @type {SortClause<TEntity>}
 */
export type SortClause<TEntity extends Entity, TProperty> = (entityInfoProxyRoot: EntityInfoProxyRoot<TEntity>) => PropertyInfoProxy<TProperty>;
