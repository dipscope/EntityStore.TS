import { Fn, TypeMetadata } from '@dipscope/type-manager/core';

import { Entity } from './entity';
import { EntityInfoProxy } from './entity-info-proxy';
import { PropertyInfo } from './property-info';
import { PropertyInfoProxy } from './property-info-proxy';
import { PropertyInfoProxyHandler } from './property-info-proxy-handler';
import { proxyTarget } from './proxy-target';

/**
 * Entity info proxy handler which allows property traversal.
 * 
 * @type {PropertyInfoProxyHandler<TProperty>}
 */
export class EntityInfoProxyHandler<TEntity extends Entity> implements ProxyHandler<EntityInfoProxy<TEntity>>
{
    /**
     * Type metadata of an entity.
     * 
     * @type {TypeMetadata<TProperty>}
     */
    public readonly typeMetadata: TypeMetadata<TEntity>;

    /**
     * Constructor.
     * 
     * @param {TypeMetadata<TProperty>} typeMetadata Type metadata of an entity.
     */
    public constructor(typeMetadata: TypeMetadata<TEntity>) 
    {
        this.typeMetadata = typeMetadata;

        return;
    }

    /**
     * Gets the value of a certain property.
     * 
     * @param {PropertyInfoProxy<TProperty>} target Property info proxy.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {PropertyInfoProxy<TProperty>} Property info proxy.
     */
    public get(target: EntityInfoProxy<TEntity>, propertyKey: PropertyKey): PropertyInfoProxy<any>
    {
        if (propertyKey === proxyTarget) 
        {
            return target;
        }

        const propertyMetadata = this.typeMetadata.propertyMetadataMap.get(propertyKey.toString());

        if (Fn.isNil(propertyMetadata)) 
        {
            // TODO: Make clear error with providing a path to Entity.property.property;
            throw new Error('Cannot define property metadata!');
        }

        const anyTarget = target as any;
        const parentPropertyInfo = anyTarget[proxyTarget] as PropertyInfo<any>;
        const typeMetadata = propertyMetadata.typeMetadata;
        const propertyInfo = new PropertyInfo<any>(propertyMetadata, typeMetadata, parentPropertyInfo);

        return new Proxy<PropertyInfoProxy<any>>(propertyInfo as any, new PropertyInfoProxyHandler<any>(typeMetadata));
    }

    /**
     * Sets the value of a certain property.
     * 
     * @returns {boolean} True when property is set. False otherwise.
     */
    public set(): boolean 
    {
        // TODO: Make clear error with providing a path to Entity.property.property;
        throw new Error('Setting values is not possible!');
    }
}