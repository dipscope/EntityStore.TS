import { ReferenceCallback, ReferenceKey } from '@dipscope/type-manager/core';
import { ReferenceValue, SerializerContext } from '@dipscope/type-manager/core';

import { PropertyInfo } from '../../property-info';

/**
 * Base class for json api expression visitors.
 * 
 * @type {JsonApiExpressionVisitor}
 */
export abstract class JsonApiExpressionVisitor
{
    /**
     * Prefix which prepended right before returned result.
     * 
     * @type {string}
     */
    public readonly prefix: string;

    /**
     * Constructor.
     * 
     * @param {string} prefix Prefix which prepended right before returned result.
     */
    public constructor(prefix: string)
    {
        this.prefix = prefix;

        return;
    }
    
    /**
     * Serializes value based on property info.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info.
     * @param {any} value Value.
     * 
     * @returns {any} Serialized value.
     */
    protected serializeValue(propertyInfo: PropertyInfo<any>, value: any): any
    {
        const serializerContext = this.createSerializerContext(propertyInfo, value);

        return serializerContext.serialize(value);
    }

    /**
     * Creates serializer context for a property.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info.
     * @param {any} x Root object.
     * 
     * @returns {SerializerContext<any>} Property serializer context.
     */
    private createSerializerContext(propertyInfo: PropertyInfo<any>, x: any): SerializerContext<any>
    {
        const serializerContext = new SerializerContext({
            $: x,
            path: '$',
            typeMetadata: propertyInfo.propertyMetadata.typeMetadata,
            referenceCallbackMap: new WeakMap<ReferenceKey, Array<ReferenceCallback>>(),
            referenceMap: new WeakMap<ReferenceKey, ReferenceValue>()
        });

        return serializerContext;
    }
}
