import { EntityProvider } from './entity-provider';

/**
 * Entity store options.
 * 
 * @type {EntityStoreOptions}
 */
export interface EntityStoreOptions
{
    /**
     * Entity provider.
     * 
     * @type {EntityProvider}
     */
    entityProvider: EntityProvider;
}
