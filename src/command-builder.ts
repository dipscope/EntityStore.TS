import { Command } from './command';

/**
 * Command builder to build a certain command.
 * 
 * @type {CommandBuilder<TCommand, TResult>}
 */
export abstract class CommandBuilder<TCommand extends Command<TResult>, TResult>
{
    /**
     * Builds a command.
     * 
     * @returns {TCommand} Command.
     */
    public abstract build(): TCommand;
}
