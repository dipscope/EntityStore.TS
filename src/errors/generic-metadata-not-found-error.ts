import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when generic metadata of type is not found.
 * 
 * @type {GenericMetadataNotFoundError}
 */
export class GenericMetadataNotFoundError extends EntityStoreError
{
    /**
     * Path to property.
     * 
     * @type {string}
     */
    public readonly path: string;

    /**
     * Constructor.
     * 
     * @param {string} path Path to property.
     */
    public constructor(path: string)
    {
        super(`${path}: cannot define generic metadata of a type. This is usually caused by invalid configuration.`);

        this.path = path;

        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
 