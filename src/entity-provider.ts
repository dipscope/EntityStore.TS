import { QueryCommand } from './commands/query-command';
import { EntityCollection } from './entity-collection';

export interface EntityProvider
{
    executeQueryCommand<TEntity>(queryCommand: QueryCommand<TEntity>): EntityCollection<TEntity>;
}
