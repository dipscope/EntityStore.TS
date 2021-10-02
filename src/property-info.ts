import { PropertyMetadata, TypeMetadata } from '@dipscope/type-manager/core';

/**
 * Class to provide information about certain property.
 * 
 * @type {PropertyInfo<TProperty>}
 */
export class PropertyInfo<TProperty>
{
    /**
     * Property medatada of a property.
     * 
     * @type {PropertyMetadata<TParent, TProperty>}
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
     * @param {PropertyMetadata<any, TProperty>} propertyMetadata Property medatada of a property.
     * @param {TypeMetadata<TProperty>} typeMetadata Type metadata of a property.
     * @param {PropertyInfo<any>} parentPropertyInfo Parent property info if there was a property traversal.
     */
    public constructor(propertyMetadata: PropertyMetadata<any, TProperty>, typeMetadata: TypeMetadata<TProperty>, parentPropertyInfo?: PropertyInfo<any>) 
    {
        this.propertyMetadata = propertyMetadata;
        this.typeMetadata = typeMetadata;
        this.parentPropertyInfo = parentPropertyInfo;

        return;
    }
}
