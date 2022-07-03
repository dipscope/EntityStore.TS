import { Command } from '../command';
import { EntityProvider } from '../entity-provider';
import { EntityStoreError } from '../entity-store-error';

/**
 * Error thrown when some command is not supported by entity provider.
 *
 * @type {CommandNotSupportedError}
 */
export class CommandNotSupportedError extends EntityStoreError
{
    /**
     * Command which is not supported.
     *
     * @type {Command<any, any>}
     */
    public readonly command: Command<any, any>;

    /**
     * Entity provider which cannot execute a command.
     *
     * @type {EntityProvider}
     */
    public readonly entityProvider: EntityProvider;

    /**
     * Constructor.
     *
     * @param {Command<any, any>} command Command which is not supported.
     * @param {EntityProvider} entityProvider Entity provider which cannot execute a command.
     */
    public constructor(command: Command<any, any>, entityProvider: EntityProvider)
    {
        super('Provided command is not supported by target entity provider.');

        Object.setPrototypeOf(this, new.target.prototype);

        this.command = command;
        this.entityProvider = entityProvider;

        return;
    }
}
