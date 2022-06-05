import { PropertyName } from '@dipscope/type-manager';

import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when one tries to set reflected property.
 *
 * @type {PropertySetError}
 */
export class PropertySetError extends EntityStoreError
{
    /**
     * Property name which was reflected.
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
     * @param {PropertyName} propertyName Property name which was reflected.
     * @param {string} path Path to property.
     */
    public constructor(propertyName: PropertyName, path: string)
    {
        super(`${path}: setting of reflected property with name ${propertyName} is not allowed.`);

        Object.setPrototypeOf(this, new.target.prototype);

        this.propertyName = propertyName;
        this.path = path;

        return;
    }
}
