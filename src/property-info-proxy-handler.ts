import { isNil } from 'lodash';
import { PropertyGetError } from './errors/property-get-error';
import { PropertySetError } from './errors/property-set-error';
import { PropertyInfo } from './property-info';
import { PropertyInfoProxy } from './property-info-proxy';
import { proxyTargetSymbol } from './proxy-target-symbol';

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
     * @param {PropertyInfo<TProperty>} targetPropertyInfo Target property info.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {PropertyInfo<TProperty>|PropertyInfoProxy<TProperty>} Property info or property info proxy.
     */
    public get(targetPropertyInfo: PropertyInfo<TProperty>, propertyKey: PropertyKey): PropertyInfo<TProperty> | PropertyInfoProxy<any>
    {
        if (propertyKey === proxyTargetSymbol)
        {
            return targetPropertyInfo;
        }

        const propertyName = propertyKey.toString();
        const propertyMetadata = targetPropertyInfo.typeMetadata.propertyMetadataMap.get(propertyName);

        if (isNil(propertyMetadata)) 
        {
            throw new PropertyGetError(propertyName, targetPropertyInfo.path);
        }

        const path = `${targetPropertyInfo.path}.${propertyName}`;
        const typeMetadata = propertyMetadata.typeMetadata;
        const propertyInfo = new PropertyInfo<any>(path, propertyMetadata, typeMetadata, targetPropertyInfo);

        return new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler());
    }

    /**
     * Sets the value of a certain property.
     * 
     * @param {PropertyInfo<TProperty>} targetPropertyInfo Target property info.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {boolean} True when property is set. False otherwise.
     */
    public set(targetPropertyInfo: PropertyInfo<TProperty>, propertyKey: PropertyKey): boolean 
    {
        const propertyName = propertyKey.toString();

        throw new PropertySetError(propertyName, targetPropertyInfo.path);
    }
}
