import { Entity } from './entity';
import { EntityInfo } from './entity-info';
import { PropertyGetError } from './errors/property-get-error';
import { PropertySetError } from './errors/property-set-error';
import { PropertyInfo } from './property-info';
import { PropertyInfoProxy } from './property-info-proxy';
import { PropertyInfoProxyHandler } from './property-info-proxy-handler';
import { proxyTargetSymbol } from './proxy-target-symbol';

/**
 * Entity info proxy handler which allows property traversal.
 * 
 * @type {EntityInfoProxyHandler<TProperty>}
 */
export class EntityInfoProxyHandler<TEntity extends Entity> implements ProxyHandler<EntityInfo<TEntity>>
{
    /**
     * Gets the value of a certain property.
     * 
     * @param {EntityInfo<TEntity>} targetEntityInfo Target entity info.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {EntityInfo<TEntity>|PropertyInfoProxy<any>} Entity info or property info proxy.
     */
    public get(targetEntityInfo: EntityInfo<TEntity>, propertyKey: PropertyKey): EntityInfo<TEntity> | PropertyInfoProxy<any>
    {
        if (propertyKey === proxyTargetSymbol)
        {
            return targetEntityInfo;
        }

        const entityName = targetEntityInfo.typeMetadata.typeName;
        const propertyName = propertyKey.toString();
        const propertyMetadata = targetEntityInfo.typeMetadata.propertyMetadataMap.get(propertyName);

        if (propertyMetadata === undefined || propertyMetadata === null) 
        {
            throw new PropertyGetError(propertyName, entityName);
        }

        const path = `${entityName}.${propertyName}`;
        const typeMetadata = propertyMetadata.typeMetadata;
        const propertyInfo = new PropertyInfo<any>(path, propertyMetadata, typeMetadata);

        return new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler());
    }

    /**
     * Sets the value of a certain property.
     * 
     * @param {EntityInfo<TEntity>} targetEntityInfo Entity info.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {boolean} True when property is set. False otherwise.
     */
    public set(targetEntityInfo: EntityInfo<TEntity>, propertyKey: PropertyKey): boolean 
    {
        const entityName = targetEntityInfo.typeMetadata.typeName;
        const propertyName = propertyKey.toString();

        throw new PropertySetError(propertyName, entityName);
    }
}
