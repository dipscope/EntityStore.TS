import isNil from 'lodash/isNil';
import { CommandBuilder } from '../command-builder';
import { QueryCommand } from '../commands/query-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';
import { EntityNotFoundError } from '../errors/entity-not-found-error';
import { KeyValue } from '../key-value';
import { Nullable } from '../nullable';

/**
 * Query command builder.
 *
 * @type {QueryCommandBuilder<TEntity>}
 */
export class QueryCommandBuilder<TEntity extends Entity> extends CommandBuilder<QueryCommand<TEntity>, TEntity, Nullable<TEntity>>
{
    /**
     * Key values.
     *
     * @type {ReadonlyArray<KeyValue>}
     */
    protected keyValues: ReadonlyArray<KeyValue>;

    /**
     * Constructor.
     *
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {ReadonlyArray<KeyValue>} keyValues Key values.
     */
    public constructor(entitySet: EntitySet<TEntity>, keyValues: ReadonlyArray<KeyValue>)
    {
        super(entitySet);

        this.keyValues = keyValues;

        return;
    }

    /**
     * Builds a query command.
     *
     * @returns {QueryCommand<TEntity>} Query command.
     */
    public build(): QueryCommand<TEntity>
    {
        return new QueryCommand(this.entityInfo, this.keyValues);
    }

    /**
     * Attaches key values.
     *
     * @param {ReadonlyArray<KeyValue>} keyValues Key values.
     *
     * @returns {QueryCommandBuilder<TEntity>} Query command builder.
     */
    public attach(keyValues: ReadonlyArray<KeyValue>): QueryCommandBuilder<TEntity>
    {
        this.keyValues = keyValues;

        return this;
    }

    /**
     * Queries entity by attached key values.
     *
     * @returns {Promise<Nullable<TEntity>>} Entity or null if entity is not found.
     */
    public query(): Promise<Nullable<TEntity>>
    {
        return this.build().delegate(this.entityProvider);
    }

    /**
     * Queries entity by attached key values or throws an error.
     *
     * @returns {Promise<TEntity>} Entity or error.
     */
    public async queryOrFail(): Promise<TEntity>
    {
        const entity = await this.query();

        if (isNil(entity))
        {
            throw new EntityNotFoundError(this.entityInfo);
        }

        return entity;
    }
}
