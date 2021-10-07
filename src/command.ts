import { EntityProvider } from './entity-provider';

/**
 * Command which can be executed over a certain entity provider.
 * 
 * @type {Command<TResult>}
 */
export abstract class Command<TResult>
{
    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<TResult>} Result of command execution.
     */
    public abstract delegate(entityProvider: EntityProvider): Promise<TResult>;
}
