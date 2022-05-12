import { Fn } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { EntityCollection } from '../../entity-collection';
import { PaginateExpression } from '../../paginate-expression';
import { PaginateExpressionVisitor } from '../../paginate-expression-visitor';
import { InMemoryPaginatePredicate } from './in-memory-paginate-predicate';

/**
 * In memory paginate expression visitor which traverses expression tree and returns a result.
 * 
 * @type {InMemoryPaginateExpressionVisitor<TEntity>}
 */
export class InMemoryPaginateExpressionVisitor<TEntity extends Entity> implements PaginateExpressionVisitor<InMemoryPaginatePredicate<TEntity>>
{
    /**
     * Visits paginate expression.
     * 
     * @param {PaginateExpression} paginateExpression Paginate expression.
     * 
     * @returns {InMemoryPaginatePredicate<TEntity>} Expression result.
     */
    public visitPaginateExpression(paginateExpression: PaginateExpression): InMemoryPaginatePredicate<TEntity>
    {
        return (entityCollection: EntityCollection<TEntity>) =>
        {
            const start = Fn.isNil(paginateExpression.offset) ? 0 : paginateExpression.offset;
            const end = Fn.isNil(paginateExpression.limit) ? undefined : start + paginateExpression.limit;
            
            return entityCollection.slice(start, end);
        };
    }
}
