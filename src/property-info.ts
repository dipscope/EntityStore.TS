import { PropertyMetadata, TypeMetadata } from '@dipscope/type-manager';
import { Entity } from './entity';

/**
 * Class to provide information about certain property.
 * 
 * @type {PropertyInfo<TProperty>}
 */
export class PropertyInfo<TProperty>
{
    /**
     * Property JSONPath from the entity. Used in error messages to give a 
     * feedback about error location.
     * 
     * @type {string}
     */
    public readonly path: string;

    /**
     * Property medatada of a property.
     * 
     * @type {PropertyMetadata<any, TProperty>}
     */
    public readonly propertyMetadata: PropertyMetadata<any, TProperty>;
    
    /**
     * Type metadata of a property.
     * 
     * @type {TypeMetadata<TProperty>}
     */
    public readonly typeMetadata: TypeMetadata<TProperty>;

    /**
     * Parent property info if there was a property traversal.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly parentPropertyInfo?: PropertyInfo<any>;

    /**
     * Constructor.
     * 
     * @param {string} path Property JSONPath from the entity.
     * @param {PropertyMetadata<any, TProperty>} propertyMetadata Property medatada of a property.
     * @param {TypeMetadata<TProperty>} typeMetadata Type metadata of a property.
     * @param {PropertyInfo<any>} parentPropertyInfo Parent property info if there was a property traversal.
     */
    public constructor(path: string, propertyMetadata: PropertyMetadata<any, TProperty>, typeMetadata: TypeMetadata<TProperty>, parentPropertyInfo?: PropertyInfo<any>)
    {
        this.path = path;
        this.propertyMetadata = propertyMetadata;
        this.typeMetadata = typeMetadata;
        this.parentPropertyInfo = parentPropertyInfo;

        return;
    }

    /**
     * Extracts property path as array.
     * 
     * @returns {Array<string>} Property path.
     */
    public extractPropertyPath(): Array<string>
    {
        const propertyPath = new Array<string>(this.propertyMetadata.propertyName);

        if (this.parentPropertyInfo == null)
        {
            return propertyPath;
        }

        const parentPropertyPath = this.parentPropertyInfo.extractPropertyPath();

        return new Array<string>(...parentPropertyPath, ...propertyPath);
    }

    /**
     * Extracts serialized property path as array.
     * 
     * @returns {Array<string>} Serialized property path.
     */
    public extractSerializedPropertyPath(): Array<string>
    {
        const propertyPath = new Array<string>(this.propertyMetadata.serializedPropertyName);

        if (this.parentPropertyInfo == null)
        {
            return propertyPath;
        }

        const parentPropertyPath = this.parentPropertyInfo.extractSerializedPropertyPath();
        
        return new Array<string>(...parentPropertyPath, ...propertyPath);
    }
    
    /**
     * Extracts deserialized property path as array.
     * 
     * @returns {Array<string>} Deserialized property path.
     */
    public extractDeserializedPropertyPath(): Array<string>
    {
        const propertyPath = new Array<string>(this.propertyMetadata.deserializedPropertyName);

        if (this.parentPropertyInfo == null)
        {
            return propertyPath;
        }

        const parentPropertyPath = this.parentPropertyInfo.extractDeserializedPropertyPath();

        return new Array<string>(...parentPropertyPath, ...propertyPath);
    }
    
    /**
     * Extracts property value from an entity.
     * 
     * @param {Entity} entity Entity.
     * 
     * @returns {any} Any value. 
     */
    public extractPropertyValue(entity: Entity): any
    {
        const propertyPath = this.extractPropertyPath();

        let propertyValue = entity;

        for (let i = 0; i < propertyPath.length; i++)
        {
            propertyValue = propertyValue[propertyPath[i]];

            if (propertyValue == null)
            {
                break;
            }
        }

        return propertyValue;
    }
}
