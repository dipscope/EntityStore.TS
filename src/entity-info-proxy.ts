import { Entity } from './entity';
import { EntityInfo } from './entity-info';
import { PropertyInfoProxyRoot } from './property-info-proxy';
import { proxyTargetSymbol } from './proxy-target-symbol';

/**
 * Entity info proxy to provide property traversal without actual accessing an object.
 * 
 * @type {EntityInfoProxy<TEntity>}
 */
export type EntityInfoProxy<TEntity extends Entity> = 
{ 
    [proxyTargetSymbol]: EntityInfo<TEntity>
};

/**
 * Root of entity info proxy.
 * 
 * @type {EntityInfoProxyRoot<TEntity>}
 */
export type EntityInfoProxyRoot<TEntity extends Entity> = EntityInfoProxy<TEntity> & 
{ 
    [TProperty in keyof TEntity]: PropertyInfoProxyRoot<TEntity[TProperty]>;
};
