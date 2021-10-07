import { Entity } from './entity';

export class EntityCollection<TEntity extends Entity>
{
    /**
     * Entities.
     *
     * @type {TEntity[]}
     */
    public readonly entities: ReadonlyArray<TEntity>;

    /**
     * Constructor.
     * 
     * @param {ReadonlyArray<TEntity>} entities Entities.
     */
    public constructor(entities: ReadonlyArray<TEntity>) 
    {
        this.entities = entities;

        return;
    }

    /**
     * Gets iterator for collection.
     *
     * @returns {}
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
     * @returns {TEntity|undefined}
     */
    public first(): TEntity | undefined
    {
        return this.entities.length > 0 ? this.entities[0] : undefined;
    }

    /**
     * Gets last entity.
     *
     * @returns {TEntity|undefined}
     */
    public last(): TEntity | undefined
    {
        return this.entities.length > 0 ? this.entities[(this.entities.length - 1)] : undefined;
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
