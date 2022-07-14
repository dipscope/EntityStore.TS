import { Entity } from './entity';
import { PaginateExpression } from './paginate-expression';
import { PaginateExpressionBuilder } from './paginate-expression-builder';

/**
 * Represents a clause to build a paginate expression.
 * 
 * @type {PaginateClause<TEntity>}
 */
export type PaginateClause<TEntity extends Entity> = (paginateExpressionBuilder: PaginateExpressionBuilder<TEntity>) => PaginateExpression;
