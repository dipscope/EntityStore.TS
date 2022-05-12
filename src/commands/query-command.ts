import { Command } from '../command';
import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { KeyValue } from '../key-value';
import { Nullable } from '../nullable';

/**
 * Command to query an entity.
 * 
 * @type {QueryCommand<Nullable<TEntity>>}
 */
export class QueryCommand<TEntity extends Entity> extends Command<TEntity, Nullable<TEntity>>
{
    /**
     * Key values.
     * 
     * @type {ReadonlyArray<KeyValue>}
     */
    public readonly keyValues: ReadonlyArray<KeyValue>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {ReadonlyArray<KeyValue>} keyValues Readonly array of key values.
     */
    public constructor(entityInfo: EntityInfo<TEntity>, keyValues: ReadonlyArray<KeyValue>)
    {
        super(entityInfo);

        this.keyValues = keyValues;
        
        return;
    }
    
    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<Nullable<TEntity>>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<Nullable<TEntity>>
    {
        return entityProvider.executeQueryCommand(this);
    }
}
