import { Entity } from './entity';
import { EntityCollection } from './entity-collection';

/**
 * Represents paginated entity collection.
 * 
 * @type {PaginatedEntityCollection<TEntity>}
 */
export abstract class PaginatedEntityCollection<TEntity extends Entity> extends EntityCollection<TEntity>
{
    /**
     * Total length of paginated entity collection.
     * 
     * @type {number}
     */
    public readonly totalLength: number;

    /**
     * Constructor.
     *
     * @param {number} totalLength Total length.
     * @param {EntityCollection<TEntity>|Array<TEntity>} entityCollectionOrEntities Entity collection or entities.
     */
    public constructor(totalLength: number, entityCollectionOrEntities: EntityCollection<TEntity> | Array<TEntity> = new Array<TEntity>())
    {
        super(entityCollectionOrEntities);

        this.totalLength = totalLength;

        return;
    }

    /**
     * Gets next page of entity collection.
     * 
     * @returns {Promise<PaginatedEntityCollection<TEntity>>} Next page of entity collection.
     */
    public abstract nextPage(): Promise<PaginatedEntityCollection<TEntity>>;

    /**
     * Checks if entity collection has next page.
     * 
     * @returns {boolean} True when entity collection has next page. False otherwise.
     */
    public abstract hasNextPage(): boolean;

    /**
     * Gets prev page of entity collection.
     * 
     * @returns {Promise<PaginatedEntityCollection<TEntity>>} Prev page of entity collection.
     */
    public abstract prevPage(): Promise<PaginatedEntityCollection<TEntity>>;

    /**
     * Checks if entity collection has prev page.
     * 
     * @returns {boolean} True when entity collection has prev page. False otherwise.
     */
    public abstract hasPrevPage(): boolean;
}
