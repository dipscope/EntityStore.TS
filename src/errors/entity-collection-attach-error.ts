import { TypeName } from '@dipscope/type-manager/core';

import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when entity collection was not attached to a command builder.
 * 
 * @type {EntityCollectionAttachError}
 */
export class EntityCollectionAttachError extends EntityStoreError
{
    /**
     * Type name of entity.
     * 
     * @type {TypeName}
     */
    public readonly typeName: TypeName;

    /**
     * Constructor.
     * 
     * @param {TypeName} typeName Type name of entity.
     */
    public constructor(typeName: TypeName)
    {
        super(`${typeName}: entity collection must be attached for building a command.`);

        this.typeName = typeName;

        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
 