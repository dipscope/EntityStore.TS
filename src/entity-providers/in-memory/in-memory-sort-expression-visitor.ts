import { Fn } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { SortExpressionVisitor } from '../../sort-expression-visitor';
import { AscSortExpression } from '../../sort-expressions/asc-sort-expression';
import { DescSortExpression } from '../../sort-expressions/desc-sort-expression';
import { InMemorySortPredicate } from './in-memory-sort-predicate';

/**
 * In memory sort expression visitor which traverses expression tree and returns a result.
 * 
 * @type {InMemorySortExpressionVisitor<TEntity>}
 */
export class InMemorySortExpressionVisitor<TEntity extends Entity> implements SortExpressionVisitor<InMemorySortPredicate<TEntity>>
{
    /**
     * Visits asc sort expression.
     * 
     * @param {AscSortExpression} ascSortExpression Asc sort expression.
     * 
     * @returns {InMemorySortPredicate<TEntity>} Expression result.
     */
    public visitAscSortExpression(ascSortExpression: AscSortExpression): InMemorySortPredicate<TEntity>
    {
        return (x: TEntity, y: TEntity) => 
        {
            const parentSortExpression = ascSortExpression.parentSortExpression;
            const parentSortResult = Fn.isNil(parentSortExpression) ? 0 : parentSortExpression.accept(this)(x, y);

            if (parentSortResult !== 0)
            {
                return parentSortResult;
            }

            const propertyInfo = ascSortExpression.propertyInfo;
            const xPropertyValue = propertyInfo.extractPropertyValue(x);
            const yPropertyValue = propertyInfo.extractPropertyValue(y);

            if (xPropertyValue > yPropertyValue)
            {
                return 1;
            }

            if (xPropertyValue < yPropertyValue)
            {
                return -1;
            }

            return 0;
        };
    }

    /**
     * Visits desc sort expression.
     * 
     * @param {DescSortExpression} descSortExpression Desc sort expression.
     * 
     * @returns {InMemorySortPredicate<TEntity>} Expression result.
     */
    public visitDescSortExpression(descSortExpression: DescSortExpression): InMemorySortPredicate<TEntity>
    {
        return (x: TEntity, y: TEntity) => 
        {
            const parentSortExpression = descSortExpression.parentSortExpression;
            const parentSortResult = Fn.isNil(parentSortExpression) ? 0 : parentSortExpression.accept(this)(x, y);

            if (parentSortResult !== 0)
            {
                return parentSortResult;
            }

            const propertyInfo = descSortExpression.propertyInfo;
            const xPropertyValue = propertyInfo.extractPropertyValue(x);
            const yPropertyValue = propertyInfo.extractPropertyValue(y);

            if (xPropertyValue > yPropertyValue)
            {
                return -1;
            }

            if (xPropertyValue < yPropertyValue)
            {
                return 1;
            }

            return 0;
        };
    }
}
