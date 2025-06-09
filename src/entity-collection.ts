import { Type } from '@dipscope/type-manager';
import { Entity } from './entity';
import { EntityCallbackFn } from './entity-callback-fn';
import { EntityCollectionLike } from './entity-collection-like';
import { EntityCollectionSerializer } from './entity-collection-serializer';
import { entityCollectionSymbol } from './entity-collection-symbol';
import { EntityFilterFn } from './entity-filter-fn';
import { EntityMapFn } from './entity-map-fn';
import { EntitySortFn } from './entity-sort-fn';
import { Nullable } from './nullable';

/**
 * Entity collection encapsulates array of entities and provides additional helper methods
 * to manipulate this array.
 *
 * @type {EntityCollection<TEntity>}
 */
@Type({
    serializer: new EntityCollectionSerializer(),
    serializedDefaultValue: () => [],
    deserializedDefaultValue: () => new EntityCollection()
})
export class EntityCollection<TEntity extends Entity>
{
    /**
     * Underlying array of entities.
     *
     * @type {Array<TEntity>}
     */
    protected readonly entities: Array<TEntity>;

    /**
     * Constructor.
     *
     * @param {EntityCollectionLike<TEntity>} entityCollectionLike Entity collection like.
     */
    public constructor(entityCollectionLike: EntityCollectionLike<TEntity> = new Array<TEntity>())
    {
        this.entities = Array.isArray(entityCollectionLike) ? entityCollectionLike : entityCollectionLike.entities;

        return;
    }
    
    /**
     * Gets iterator for a collection.
     *
     * @returns {Iterator<TEntity>} Iterator over entities.
     */
    public [Symbol.iterator](): Iterator<TEntity>
    {
        return this.entities[Symbol.iterator]();
    }

    /**
     * Gets underlying array of entities. Besides this symbol is used to identify entity collection between modules.
     *
     * @returns {ReadonlyArray<TEntity>} Underlying array of entities.
     */
    public [entityCollectionSymbol](): ReadonlyArray<TEntity>
    {
        return this.entities;
    }

    /**
     * Gets length of the collection. This is a number one higher than the highest
     * index in the collection.
     *
     * @returns {number} Length of the collection.
     */
    public get length(): number
    {
        return this.entities.length;
    }

    /**
     * Removes the first entity from a collection and returns it. If the collection is empty, null is
     * returned and the collection is not modified.
     *
     * @returns {Nullable<TEntity>} First entity removed from a collection or null if collection is empty.
     */
    public shift(): Nullable<TEntity>
    {
        return this.entities.shift() ?? null;
    }

    /**
     * Removes the last entity from a collection and returns it. If the collection is empty, null is
     * returned and the collection is not modified.
     *
     * @returns {Nullable<TEntity>} Last entity removed from a collection or null if collection is empty.
     */
    public pop(): Nullable<TEntity>
    {
        return this.entities.pop() ?? null;
    }

    /**
     * Appends new entities to the end of a collection, and returns the new length of the collection.
     *
     * @param {Array<TEntity>} entities Array of entities to append.
     *
     * @returns {number} New length of entity collection.
     */
    public push(...entities: Array<TEntity>): number
    {
        return this.entities.push(...entities);
    }

    /**
     * Inserts new entities at the start of a collection, and returns the new length of the collection.
     *
     * @param {Array<TEntity>} entities Array of entities to append.
     *
     * @returns {number} New length of entity collection.
     */
    public unshift(...entities: Array<TEntity>): number
    {
        return this.entities.unshift(...entities);
    }

    /**
     * Combines two or more entity collections.
     *
     * @param {Array<EntityCollection<TEntity>>} entityCollections Entity collections.
     *
     * @returns {EntityCollection<TEntity>} New entity collection without modifying any existing one.
     */
    public concat(...entityCollections: Array<EntityCollection<TEntity>>): EntityCollection<TEntity>;
    public concat(...entityArrays: Array<Array<TEntity>>): EntityCollection<TEntity>;
    public concat(...entityCollectionsOrEntityArrays: Array<EntityCollection<TEntity>> | Array<Array<TEntity>>): EntityCollection<TEntity>
    {
        let entities = this.entities;

        for (const entityCollectionOtEntityArray of entityCollectionsOrEntityArrays)
        {
            if (Array.isArray(entityCollectionOtEntityArray))
            {
                entities = entities.concat(entityCollectionOtEntityArray);

                continue;
            }

            entities = entities.concat(entityCollectionOtEntityArray.entities);
        }

        return new EntityCollection<TEntity>(entities);
    }

    /**
     * Returns a copy of a section of a collection. For both start and end, a negative index can be used
     * to indicate an offset from the end of the collection. For example, -2 refers to the second to last element of the collection.
     *
     * @param {number} start The beginning inclusive index of the specified portion of the array. If start is undefined, then the slice begins at index 0.
     * @param {number} end The end exclusive index of the specified portion of the array. If end is undefined, then the slice extends to the end of the array.
     *
     * @returns {EntityCollection<TEntity>} Entity collection representing a slice.
     */
    public slice(start?: number, end?: number): EntityCollection<TEntity>
    {
        return new EntityCollection(this.entities.slice(start, end));
    }

    /**
     * Reverses the entities in a collection in place. This method mutates the collection and
     * returns a reference to the same collection.
     *
     * @returns {EntityCollection<TEntity>} Current instance of entity collection.
     */
    public reverse(): EntityCollection<TEntity>
    {
        this.entities.reverse();

        return this;
    }

    /**
     * Sorts a collection in place. This method mutates the collection and returns a reference to the same collection.
     *
     * @param {EntitySortFn<TEntity>} entitySortFn Function used to determine the order of the entities.
     *
     * @returns {EntityCollection<TEntity>} Sorted entity collection.
     */
    public sort(entitySortFn: EntitySortFn<TEntity>): EntityCollection<TEntity>
    {
        this.entities.sort(entitySortFn);

        return this;
    }

    /**
     * Returns the index of the first occurrence of an entity in a collection, or -1 if it is not present.
     *
     * @param entity The entity to locate in the collection.
     * @param fromIndex The collection index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     *
     * @returns {number} Entity index in the collection or -1 if it is not present.
     */
    public indexOf(entity: TEntity, fromIndex?: number): number
    {
        return this.entities.indexOf(entity, fromIndex);
    }

    /**
     * Determines whether all the entities of a collection satisfy the specified filter function.
     *
     * @param {EntityFilterFn<TEntity>} entityFilterFn Entity filter function.
     *
     * @returns {boolean} True when all the entities of a collection satisfy the specified filter function. False otherwise.
     */
    public every(entityFilterFn: EntityFilterFn<TEntity>): boolean
    {
        return this.entities.every(entityFilterFn);
    }

    /**
     * Determines whether the specified filter function returns true for any entity of a collection.
     *
     * @param {EntityFilterFn<TEntity>} entityFilterFn Entity filter function.
     *
     * @returns {boolean} True when any entity of a collection satisfy the specified filter function. False otherwise.
     */
    public some(entityFilterFn: EntityFilterFn<TEntity>): boolean
    {
        return this.entities.some(entityFilterFn);
    }

    /**
     * Performs the specified action for each entity in a collection.
     *
     * @param {EntityCallbackFn<TEntity>} entityCallbackFn Entity callback function.
     *
     * @returns {void} Nothing.
     */
    public forEach(entityCallbackFn: EntityCallbackFn<TEntity>): void
    {
        return this.entities.forEach(entityCallbackFn);
    }

    /**
     * Calls a defined map function on each entity of a collection, and returns an array that contains the results.
     *
     * @param {EntityMapFn<TEntity, TResult>} entityMapFn Entity map function.
     *
     * @returns {Array<TResult>} Array of map results.
     */
    public map<TResult>(entityMapFn: EntityMapFn<TEntity, TResult>): Array<TResult>
    {
        return this.entities.map(entityMapFn);
    }

    /**
     * Returns the entity collection with entities that meet the condition specified in a filter function.
     *
     * @param {EntityFilterFn<TEntity>} entityFilterFn Entity filter function.
     *
     * @returns {EntityCollection<TEntity>} Filtered entity collection.
     */
    public filter(entityFilterFn: EntityFilterFn<TEntity>): EntityCollection<TEntity>
    {
        return new EntityCollection(this.entities.filter(entityFilterFn));
    }

    /**
     * Checks if collection is empty.
     *
     * @returns {boolean} True when collection is empty. False otherwise.
     */
    public isEmpty(): boolean
    {
        return this.entities.length === 0;
    }

    /**
     * Gets first entity mathing the filter function or null if it is not found. If filter function is undefined then tries to get the
     * first entity in the collection.
     *
     * @param {EntityFilterFn<TEntity>} entityFilterFn Entity filter function.
     *
     * @returns {Nullable<TEntity>} First entity matching the filter function or null if it is not found.
     */
    public first(entityFilterFn?: EntityFilterFn<TEntity>): Nullable<TEntity>
    {
        const entities = this.entities;

        if (entities.length === 0)
        {
            return null;
        }

        const firstIndex = 0;

        if (entityFilterFn === undefined || entityFilterFn === null)
        {
            return entities[firstIndex];
        }

        for (let i = firstIndex; i < entities.length; i++)
        {
            const entity = entities[i];

            if (entityFilterFn(entity, i, entities))
            {
                return entity;
            }
        }

        return null;
    }

    /**
     * Gets last entity mathing the filter function or null if it is not found. If filter function is undefined then tries to get the
     * last entity in the collection.
     *
     * @param {EntityFilterFn<TEntity>} entityFilterFn Entity filter function.
     *
     * @returns {Nullable<TEntity>} Last entity matching the filter function or null if it is not found.
     */
    public last(entityFilterFn?: EntityFilterFn<TEntity>): Nullable<TEntity>
    {
        const entities = this.entities;

        if (entities.length === 0)
        {
            return null;
        }

        const lastIndex = entities.length - 1;

        if (entityFilterFn === undefined || entityFilterFn === null)
        {
            return entities[lastIndex];
        }

        for (let i = lastIndex; i >= 0; i--)
        {
            const entity = entities[i];

            if (entityFilterFn(entity, i, entities))
            {
                return entity;
            }
        }

        return null;
    }

    /**
     * Finds entity matching the filter function.
     *
     * @param {EntityFilterFn<TEntity>} entityFilterFn Entity filter function.
     *
     * @returns {Nullable<TEntity>} Entity or null if it is not found.
     */
    public find(entityFilterFn: EntityFilterFn<TEntity>): Nullable<TEntity>
    {
        return this.entities.find(entityFilterFn) ?? null;
    }

    /**
     * Clears the entity collection. This method mutates entity collection and returns
     * current instance.
     *
     * @returns {EntityCollection<TEntity>} Cleared instance of entity collection.
     */
    public clear(): EntityCollection<TEntity>
    {
        this.entities.splice(0, this.entities.length);

        return this;
    }

    /**
     * Tries to remove provided entity from a collection.
     *
     * @param {TEntity} entity Entity to remove.
     *
     * @returns {boolean} True if entity is removed. False otherwise.
     */
    public remove(entity: TEntity): boolean
    {
        const index = this.entities.indexOf(entity);

        if (index >= 0)
        {
            this.entities.splice(index, 1);

            return true;
        }

        return false;
    }

    /**
     * Tries to get entity at provided index.
     *
     * @param {number} index Index of entity.
     *
     * @returns {Nullable<TEntity>} Entity or null if it is not present.
     */
    public at(index: number): Nullable<TEntity>
    {
        return this.entities[index] ?? null;
    }

    /**
     * Converts entity collection to array.
     *
     * @returns {ReadonlyArray<TEntity>} Array of entities.
     */
    public toArray(): ReadonlyArray<TEntity>
    {
        return this.entities;
    }

    /**
     * Checks if collection contains entity.
     *
     * @param {TEntity} entity Target entity.
     *
     * @returns {boolean} True if collection contains entity. False otherwise.
     */
    public contains(entity: TEntity): boolean
    {
        return this.entities.indexOf(entity) >= 0;
    }
}
