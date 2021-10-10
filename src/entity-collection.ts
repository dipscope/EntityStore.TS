import { Entity } from './entity';
import { Nullable } from './nullable';

/**
 * Entity collection to add additional behaviours specific for entities.
 * 
 * @type {EntityCollection<TEntity>}
 */
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
    public constructor(entities: ReadonlyArray<TEntity>) 
    {
        this.entities = entities;

        return;
    }

    /**
     * Gets iterator for a collection.
     *
     * @returns {Iterator<TEntity>}
     */
    public [Symbol.iterator](): Iterator<TEntity>
    {
        return this.entities[Symbol.iterator]();
    }
    
    /**
     * Gets length of collection.
     *
     * @returns {number}
     */
    public get length(): number
    {
        return this.entities.length;
    }

    /**
     * Gets first entity.
     *
     * @returns {Nullable<TEntity>}
     */
    public first(): Nullable<TEntity>
    {
        return this.entities.length > 0 ? this.entities[0] : null;
    }

    /**
     * Gets last entity.
     *
     * @returns {Nullable<TEntity>}
     */
    public last(): Nullable<TEntity>
    {
        return this.entities.length > 0 ? this.entities[this.entities.length - 1] : null;
    }

    /**
     * Determines whether the specified callback function returns true for
     * any element of an array.
     *
     * @param {callback}
     *
     * @returns {boolean}
     */
    public some(callback: (value: TEntity, index: number, array: ReadonlyArray<TEntity>) => unknown): boolean
    {
        return this.entities.some(callback);
    }

    /**
     * Counts entities in collection.
     *
     * @returns {number}
     */
    public count(): number
    {
        return this.length;
    }

    /**
     * Checks if collection is empty.
     *
     * @returns {boolean}
     */
    public isEmpty(): boolean
    {
        return this.length === 0;
    }
}
