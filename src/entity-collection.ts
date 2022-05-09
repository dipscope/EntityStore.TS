import { Type } from '@dipscope/type-manager';

import { Entity } from './entity';
import { EntityCollectionSerializer } from './entity-collection-serializer';
import { entityCollectionSymbol } from './entity-collection-symbol';
import { Nullable } from './nullable';

/**
 * Entity collection encapsulates array of entities and provides additional helper methods
 * to manipulate this array. It designed to be used everywhere instead of arrays.
 * 
 * @type {EntityCollection<TEntity>}
 */
@Type({
    serializer: new EntityCollectionSerializer(),
    defaultValue: () => new EntityCollection<any>()
})
export class EntityCollection<TEntity extends Entity>
{
    /**
     * Readonly array of entities.
     *
     * @type {ReadonlyArray<TEntity>}
     */
    public readonly entities: ReadonlyArray<TEntity>;

    /**
     * Constructor.
     * 
     * @param {ReadonlyArray<TEntity>} entities Readonly array of entities.
     */
    public constructor(entities: ReadonlyArray<TEntity> = new Array<TEntity>())
    {
        this.entities = entities;

        return;
    }

    /**
     * Gets mark of entity collection. Required for entity collection identity between 
     * modules after compilation. Used by entity collection serializer.
     * 
     * @returns {boolean} True if object represents entity collection.
     */
    public [entityCollectionSymbol](): boolean
    {
        return true;
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
     * Gets length of collection.
     *
     * @returns {number} Length of the collection.
     */
    public get length(): number
    {
        return this.entities.length;
    }

    /**
     * Counts entities in collection.
     *
     * @returns {number} Counts entities in the collection.
     */
    public count(): number
    {
        return this.entities.length;
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
     * Gets first entity.
     *
     * @returns {Nullable<TEntity>} First entity or null if collection is empty.
     */
    public first(): Nullable<TEntity>
    {
        return this.entities.length > 0 ? this.entities[0] : null;
    }

    /**
     * Gets last entity.
     *
     * @returns {Nullable<TEntity>} Last entity or null if collection is empty.
     */
    public last(): Nullable<TEntity>
    {
        return this.entities.length > 0 ? this.entities[this.entities.length - 1] : null;
    }

    /**
     * Determines whether the specified callback function returns true for
     * any element of an array.
     *
     * @param {callback} callback Callback to the for some entities.
     *
     * @returns {boolean} True if entities match callback. False otherwise.
     */
    public some(callback: (value: TEntity, index: number, array: ReadonlyArray<TEntity>) => unknown): boolean
    {
        return this.entities.some(callback);
    }
}
