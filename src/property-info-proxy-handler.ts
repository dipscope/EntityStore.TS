import { Fn, TypeMetadata } from '@dipscope/type-manager/core';

import { PropertyInfo } from './property-info';
import { PropertyInfoProxy } from './property-info-proxy';
import { proxyTarget } from './proxy-target';

/**
 * Property info proxy handler which allows property traversal.
 * 
 * @type {PropertyInfoProxyHandler<TProperty>}
 */
export class PropertyInfoProxyHandler<TProperty> implements ProxyHandler<PropertyInfo<TProperty>>
{
    /**
     * Gets the value of a certain property info.
     * 
     * @param {PropertyInfo<TProperty>} propertyInfoTarget Property info target.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {PropertyInfo<TProperty>|PropertyInfoProxy<TProperty>} Property info or property info proxy.
     */
    public get(propertyInfoTarget: PropertyInfo<TProperty>, propertyKey: PropertyKey): PropertyInfo<TProperty> | PropertyInfoProxy<any>
    {
        if (propertyKey === proxyTarget)
        {
            return propertyInfoTarget;
        }

        const propertyMetadata = this.typeMetadata.propertyMetadataMap.get(propertyKey.toString());

        if (Fn.isNil(propertyMetadata)) 
        {
            // TODO: Make clear error with providing a path to Entity.property.property;
            throw new Error('Cannot define property metadata!');
        }

        const anyPropertyInfoProxy = propertyInfoProxy as any;
        const parentPropertyInfo = anyPropertyInfoProxy[proxyTarget] as PropertyInfo<any>;
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