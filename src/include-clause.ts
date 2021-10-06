import { Entity } from './entity';
import { EntityCollection } from './entity-collection';
import { EntityInfoProxyRoot } from './entity-info-proxy';
import { PropertyInfoProxy, PropertyInfoProxyRoot } from './property-info-proxy';

/**
 * Represents a clause to build an include expression for an entity.
 * 
 * @type {IncludeClause<TEntity, TProperty>}
 */
export type IncludeClause<TEntity extends Entity, TProperty extends Entity> = (entityInfoProxyRoot: EntityInfoProxyRoot<TEntity>) => PropertyInfoProxy<TProperty>;

/**
 * Represents a clause to build an include expression for an entity collection.
 * 
 * @type {IncludeCollectionClause<TEntity, TProperty>}
 */
export type IncludeCollectionClause<TEntity extends Entity, TProperty extends Entity> = (entityInfoProxyRoot: EntityInfoProxyRoot<TEntity>) => PropertyInfoProxy<EntityCollection<TProperty>>;

/**
 * Represents a clause to build a child include expression for an entity.
 * 
 * @type {ThenIncludeClause<TProperty, TChildProperty>}
 */
export type ThenIncludeClause<TProperty extends Entity, TChildProperty extends Entity> = (propertyInfoProxyRoot: PropertyInfoProxyRoot<TProperty>) => PropertyInfoProxy<TChildProperty>;

/**
 * Represents a clause to build a child include expression for an entity collection.
 * 
 * @type {ThenIncludeCollectionClause<TEntity, TChildProperty>}
 */
export type ThenIncludeCollectionClause<TProperty extends Entity, TChildProperty extends Entity> = (propertyInfoProxyRoot: PropertyInfoProxyRoot<TProperty>) => PropertyInfoProxy<EntityCollection<TChildProperty>>;
