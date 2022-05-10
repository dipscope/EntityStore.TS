/**
 * Base class for all entity store errors.
 * 
 * @type {EntityStoreError}
 */
export class EntityStoreError extends Error
{
    /**
     * Constructor.
     * 
     * @param {string} message Message.
     */
    public constructor(message: string)
    {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
