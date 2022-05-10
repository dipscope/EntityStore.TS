import { PropertyName } from '@dipscope/type-manager/core';

import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when one tries to set property using entity set.
 * 
 * @type {PropertySetError}
 */
export class PropertySetError extends EntityStoreError
{
    /**
     * Property name which one tries to set.
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
     * @param {PropertyName} propertyName Property name which one tries to set.
     * @param {string} path Path to property.
     */
    public constructor(propertyName: PropertyName, path: string)
    {
        super(`${path}: setting of property with name ${propertyName} is not allowed.`);

        this.propertyName = propertyName;
        this.path = path;

        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
 