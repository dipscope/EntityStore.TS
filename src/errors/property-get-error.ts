import { PropertyName } from '@dipscope/type-manager';
import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when one tries to access property which was not reflected.
 *
 * @type {PropertyGetError}
 */
export class PropertyGetError extends EntityStoreError
{
    /**
     * Property name which was not reflected.
     *
     * @type {PropertyName}
     */
    public readonly propertyName: PropertyName;

    /**
     * Path to property.
     *
     * @type {string}
     */
    public readonly path: string;

    /**
     * Constructor.
     *
     * @param {PropertyName} propertyName Property name which was not reflected.
     * @param {string} path Path to property.
     */
    public constructor(propertyName: PropertyName, path: string)
    {
        super(`${path}: property with name ${propertyName} was not reflected for an entity type.`);

        Object.setPrototypeOf(this, new.target.prototype);

        this.propertyName = propertyName;
        this.path = path;

        return;
    }
}
