import { Entity } from './entity';
import { EntityInfoProxyRoot } from './entity-info-proxy';
import { PropertyInfoProxy } from './property-info-proxy';

/**
 * Represents a clause to build an order expression for entities.
 * 
 * @type {OrderClause<TEntity>}
 */
export type OrderClause<TEntity extends Entity, TProperty> = (entityInfoProxyRoot: EntityInfoProxyRoot<TEntity>) => PropertyInfoProxy<TProperty>;
