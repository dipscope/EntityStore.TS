import { isArray, isNull, isUndefined } from 'lodash';
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
        if (isUndefined(x))
        {
            return serializerContext.serializedDefaultValue;
        }

        if (isNull(x))
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
                const valueSerializerContext = genericSerializerContext.defineChildSerializerContext({ jsonPathKey: genericSerializerContext.jsonPathKey });

                for (let i = 0; i < arrayInput.length; i++)
                {
                    valueSerializerContext.hasJsonPathKey(i);
                    valueSerializerContext.hasReferenceValueSetter(v => arrayOutput[i] = v);

                    arrayOutput[i] = valueSerializerContext.serialize(arrayInput[i]);
                }

                return arrayOutput;
            });
        }

        if (serializerContext.log.errorEnabled)
        {
            serializerContext.log.error(`${serializerContext.jsonPath}: cannot serialize value as entity collection.`, x);
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
        if (isUndefined(x))
        {
            return serializerContext.deserializedDefaultValue;
        }

        if (isNull(x))
        {
            return serializerContext.deserializedNullValue;
        }

        if (isArray(x))
        {
            return serializerContext.restoreReference(x, () =>
            {
                const arrayInput = x;
                const arrayOutput = new Array<any>(arrayInput.length);
                const genericSerializerContext = serializerContext.defineGenericSerializerContext(0);
                const valueSerializerContext = genericSerializerContext.defineChildSerializerContext({ jsonPathKey: genericSerializerContext.jsonPathKey });
                const entityCollectionCtor = serializerContext.typeMetadata.typeFn as TypeCtor<EntityCollection<any>>;

                for (let i = 0; i < arrayInput.length; i++)
                {
                    valueSerializerContext.hasJsonPathKey(i);
                    valueSerializerContext.hasReferenceValueSetter(v => arrayOutput[i] = v);
                    
                    arrayOutput[i] = valueSerializerContext.deserialize(arrayInput[i]);
                }

                return new entityCollectionCtor(arrayOutput);
            });
        }

        if (serializerContext.log.errorEnabled)
        {
            serializerContext.log.error(`${serializerContext.jsonPath}: cannot deserialize value as entity collection.`, x);
        }

        return undefined;
    }
}
