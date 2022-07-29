import { Entity } from './entity';
import { EntityCollection } from './entity-collection';
import { EntityCollectionLike } from './entity-collection-like';

/**
 * Represents paginated entity collection.
 * 
 * @type {PaginatedEntityCollection<TEntity>}
 */
export abstract class PaginatedEntityCollection<TEntity extends Entity> extends EntityCollection<TEntity>
{
    /**
     * Total length of paginated entity collection if known.
     * 
     * @type {number}
     */
    public readonly totalLength?: number;
    
    /**
     * Constructor.
     * 
     * @param {EntityCollectionLike<TEntity>} entityCollectionLike Entity collection like.
     * @param {number} totalLength Total length.
     */
    public constructor(entityCollectionLike: EntityCollectionLike<TEntity> = new Array<TEntity>(), totalLength?: number)
    {
        super(entityCollectionLike);

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
