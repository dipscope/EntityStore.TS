import { Fn, Serializer, SerializerContext, TypeLike } from '@dipscope/type-manager/core';

import { EntityCollection } from './entity-collection';
import { entityCollectionSymbol } from './entity-collection-symbol';

/**
 * Entity collection serializer.
 * 
 * @type {EntityCollectionSerializer}
 */
export class EntityCollectionSerializer implements Serializer<EntityCollection<any>>
{
    /**
     * Serializes provided value.
     * 
     * @param {TypeLike<EntityCollection<any>>} x Some value.
     * @param {SerializerContext<EntityCollection<any>>} serializerContext Serializer context.
     * 
     * @returns {TypeLike<any>} Serialized value or undefined.
     */
    public serialize(x: TypeLike<EntityCollection<any>>, serializerContext: SerializerContext<EntityCollection<any>>): TypeLike<any>
    {
        if (Fn.isUndefined(x))
        {
            return serializerContext.defaultValue;
        }

        if (Fn.isNull(x))
        {
            return x;
        }
        
        if (!Fn.isNil(x[entityCollectionSymbol]))
        {
            return serializerContext.defineReference(x, () =>
            {
                const arrayInput = x.entities;
                const arrayOutput = new Array<any>();
                const genericSerializerContext = serializerContext.defineGenericSerializerContext(0);
                
                for (let i = 0; i < arrayInput.length; i++)
                {
                    const valueSerializerContext = genericSerializerContext.defineChildSerializerContext({
                        path: `${genericSerializerContext.path}[${i}]` 
                    });

                    const value = valueSerializerContext.serialize(arrayInput[i]);
        
                    if (Fn.isFunction(value))
                    {
                        genericSerializerContext.pushReferenceCallback(arrayInput[i], () =>
                        {
                            arrayOutput[i] = value();
                        });
        
                        continue;
                    }
        
                    arrayOutput[i] = value;
                }
        
                return arrayOutput;
            });
        }

        if (serializerContext.log.errorEnabled)
        {
            serializerContext.log.error(`${serializerContext.path}: Cannot serialize value as entity collection!`, x);
        }

        return undefined;
    }

    /**
     * Deserializes provided value.
     * 
     * @param {TypeLike<any>} x Some value.
     * @param {SerializerContext<EntityCollection<any>>} serializerContext Serializer context.
     * 
     * @returns {TypeLike<EntityCollection<any>>} Deserialized value.
     */
    public deserialize(x: TypeLike<any>, serializerContext: SerializerContext<EntityCollection<any>>): TypeLike<EntityCollection<any>>
    {
        if (Fn.isUndefined(x))
        {
            return serializerContext.defaultValue;
        }

        if (Fn.isNull(x))
        {
            return x;
        }

        if (Fn.isArray(x))
        {
            return serializerContext.restoreReference(x, () =>
            {
                const arrayInput = x;
                const arrayOutput = new Array<any>();
                const genericSerializerContext = serializerContext.defineGenericSerializerContext(0);
                
                for (let i = 0; i < arrayInput.length; i++)
                {
                    const valueSerializerContext = genericSerializerContext.defineChildSerializerContext({
                        path: `${genericSerializerContext.path}[${i}]` 
                    });

                    const value = valueSerializerContext.deserialize(arrayInput[i]);
        
                    if (Fn.isFunction(value))
                    {
                        genericSerializerContext.pushReferenceCallback(arrayInput[i], () =>
                        {
                            arrayOutput[i] = value();
                        });
        
                        continue;
                    }

                    arrayOutput[i] = value;
                }
        
                return new EntityCollection<any>(arrayOutput);
            });
        }
        
        if (serializerContext.log.errorEnabled) 
        {
            serializerContext.log.error(`${serializerContext.path}: Cannot deserialize value as entity collection!`, x);
        }

        return undefined;
    }
}
