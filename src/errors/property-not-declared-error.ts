import { PropertyName } from '@dipscope/type-manager/core';

import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when one tries to access property which was not declared using
 * type manager.
 * 
 * @type {PropertyNotDeclaredError}
 */
export class PropertyNotDeclaredError extends EntityStoreError
{
    /**
     * Property name which is not declared.
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
     * @param {PropertyName} propertyName roperty name which is not declared.
     * @param {string} path Path to property.
     */
    public constructor(propertyName: PropertyName, path: string)
    {
        super(`${path}: property with name ${propertyName} is not declared for an entity type.`);

        this.propertyName = propertyName;
        this.path = path;

        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
 