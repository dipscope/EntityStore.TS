import { Serializer, SerializerContext, TypeCtor, TypeLike } from '@dipscope/type-manager';
import { EntityCollection } from './entity-collection';
import { isEntityCollection } from './functions/is-entity-collection';

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
        if (x === undefined)
        {
            return serializerContext.serializedDefaultValue;
        }

        if (x === null)
        {
            return serializerContext.serializedNullValue;
        }

        if (isEntityCollection(x))
        {
            return serializerContext.defineReference(x, () =>
            {
                const arrayInput = x.toArray();
                const arrayOutput = new Array<any>(arrayInput.length);
                const genericSerializerContext = serializerContext.defineGenericSerializerContext(0);
                const valueSerializerContext = genericSerializerContext.defineChildSerializerContext();
                const serializer = valueSerializerContext.serializer;

                valueSerializerContext.referenceValueSetter = (v, k) => arrayOutput[k] = v;
                
                for (let i = 0; i < arrayInput.length; i++)
                {
                    valueSerializerContext.jsonPathKey = i;

                    arrayOutput[i] = serializer.serialize(arrayInput[i], valueSerializerContext);
                }

                return arrayOutput;
            });
        }

        serializerContext.logger.error(`${serializerContext.jsonPath}: cannot serialize value as entity collection.`, x);

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
        if (x === undefined)
        {
            return serializerContext.deserializedDefaultValue;
        }

        if (x === null)
        {
            return serializerContext.deserializedNullValue;
        }

        if (Array.isArray(x))
        {
            return serializerContext.restoreReference(x, () =>
            {
                const arrayInput = x;
                const arrayOutput = new Array<any>(arrayInput.length);
                const genericSerializerContext = serializerContext.defineGenericSerializerContext(0);
                const valueSerializerContext = genericSerializerContext.defineChildSerializerContext();
                const entityCollectionCtor = serializerContext.typeMetadata.typeFn as TypeCtor<EntityCollection<any>>;
                const serializer = valueSerializerContext.serializer;

                serializerContext.referenceValueSetter = (v, k) => arrayOutput[k] = v;
                for (let i = 0; i < arrayInput.length; i++)
                {
                    valueSerializerContext.jsonPathKey = i;
                    
                    arrayOutput[i] = serializer.deserialize(arrayInput[i], valueSerializerContext);
                }

                return new entityCollectionCtor(arrayOutput);
            });
        }

        serializerContext.logger.error(`${serializerContext.jsonPath}: cannot deserialize value as entity collection.`, x);

        return undefined;
    }
}
