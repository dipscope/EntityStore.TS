import { QueryCommand } from './commands/create-command';
import { Entity } from './entity';
import { EntityCollection } from './entity-collection';
import { EntityVisitor } from './entity-visitor';
import { ExpressionVisitor } from './expression-visitor';

export interface EntityProvider
{
    executeQueryCommand<TEntity>(queryCommand: QueryCommand<TEntity>): EntityCollection<TEntity>;
}
