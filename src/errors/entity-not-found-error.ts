import { EntityInfo } from '../entity-info';
import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when entity not found.
 *
 * @type {EntityNotFoundError}
 */
export class EntityNotFoundError extends EntityStoreError
{
    /**
     * Info about entity which is not found.
     *
     * @type {EntityInfo<any>}
     */
    public readonly entityInfo: EntityInfo<any>;

    /**
     * Constructor.
     *
     * @param {EntityInfo<any>} entityInfo Info about entity which is not found.
     */
    public constructor(entityInfo: EntityInfo<any>)
    {
        super(`Entity of type ${entityInfo.typeMetadata.typeName} is not found.`);

        Object.setPrototypeOf(this, new.target.prototype);

        this.entityInfo = entityInfo;

        return;
    }
}
