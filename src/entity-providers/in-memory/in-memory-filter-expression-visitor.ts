import { Fn } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { FilterExpressionVisitor } from '../../filter-expression-visitor';
import { AndExpression } from '../../filter-expressions/and-filter-expression';
import { ContainsExpression } from '../../filter-expressions/contains-filter-expression';
import { EndsWithExpression } from '../../filter-expressions/ends-with-filter-expression';
import { EqExpression } from '../../filter-expressions/eq-filter-expression';
import { GtExpression } from '../../filter-expressions/gt-filter-expression';
import { GteExpression } from '../../filter-expressions/gte-filter-expression';
import { InExpression } from '../../filter-expressions/in-filter-expression';
import { LtExpression } from '../../filter-expressions/lt-filter-expression';
import { LteExpression } from '../../filter-expressions/lte-filter-expression';
import { NotContainsExpression } from '../../filter-expressions/not-contains-filter-expression';
import { NotEndsWithExpression } from '../../filter-expressions/not-ends-with-filter-expression';
import { NotEqExpression } from '../../filter-expressions/not-eq-filter-expression';
import { NotInExpression } from '../../filter-expressions/not-in-filter-expression';
import {
    NotStartsWithExpression
} from '../../filter-expressions/not-starts-with-filter-expression';
import { OrExpression } from '../../filter-expressions/or-filter-expression';
import { StartsWithExpression } from '../../filter-expressions/starts-with-filter-expression';
import { InMemoryFilterPredicate } from './in-memory-filter-predicate';

/**
 * In memory filter expression visitor which traverses expression tree and returns a result.
 * 
 * @type {InMemoryFilterExpressionVisitor<TEntity>}
 */
export class InMemoryFilterExpressionVisitor<TEntity extends Entity> implements FilterExpressionVisitor<InMemoryFilterPredicate<TEntity>>
{
    /**
     * Visits equal expression.
     * 
     * @param {EqExpression} eqExpression Equal expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitEqExpression(eqExpression: EqExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = eqExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = eqExpression.value;

            return propertyValue === value;
        };
    }

    /**
     * Visits not equal expression.
     * 
     * @param {NotEqExpression} notEqExpression Not equal expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitNotEqExpression(notEqExpression: NotEqExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notEqExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notEqExpression.value;

            return propertyValue !== value;
        };
    }

    /**
     * Visits in expression.
     * 
     * @param {InExpression} inExpression In expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitInExpression(inExpression: InExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = inExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const values = inExpression.values;

            for (const value of values)
            {
                if (propertyValue === value)
                {
                    return true;
                }
            }

            return false;
        };
    }

    /**
     * Visits not in expression.
     * 
     * @param {NotInExpression} notInExpression Not in expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitNotInExpression(notInExpression: NotInExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notInExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const values = notInExpression.values;

            for (const value of values)
            {
                if (propertyValue === value)
                {
                    return false;
                }
            }

            return true;
        };
    }

    /**
     * Visits greater than expression.
     * 
     * @param {GtExpression} gtExpression Greater than expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitGtExpression(gtExpression: GtExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = gtExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = gtExpression.value;

            return propertyValue > value;
        };
    }

    /**
     * Visits greater than or equal expression.
     * 
     * @param {GteExpression} gteExpression Greater than or equal expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitGteExpression(gteExpression: GteExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = gteExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = gteExpression.value;

            return propertyValue >= value;
        };
    }

    /**
     * Visits lower than expression.
     * 
     * @param {LtExpression} ltExpression Lower than expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitLtExpression(ltExpression: LtExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = ltExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = ltExpression.value;

            return propertyValue < value;
        };
    }

    /**
     * Visits lower than or equal expression.
     * 
     * @param {LteExpression} lteExpression Lower than or equal expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitLteExpression(lteExpression: LteExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = lteExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = lteExpression.value;

            return propertyValue <= value;
        };
    }

    /**
     * Visits contains expression.
     * 
     * @param {ContainsExpression} containsExpression Contains expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitContainsExpression(containsExpression: ContainsExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = containsExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = containsExpression.value;

            return Fn.isString(propertyValue) ? propertyValue.includes(value) : false;
        };
    }

    /**
     * Visits not contains expression.
     * 
     * @param {NotContainsExpression} notContainsExpression Not contains expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitNotContainsExpression(notContainsExpression: NotContainsExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notContainsExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notContainsExpression.value;

            return Fn.isString(propertyValue) ? !propertyValue.includes(value) : true;
        };
    }

    /**
     * Visits starts with expression.
     * 
     * @param {StartsWithExpression} startsWithExpression Starts with expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitStartsWithExpression(startsWithExpression: StartsWithExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = startsWithExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = startsWithExpression.value;

            return Fn.isString(propertyValue) ? propertyValue.startsWith(value) : false;
        };
    }

    /**
     * Visits not starts with expression.
     * 
     * @param {NotStartsWithExpression} notStartsWithExpression Not starts with expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitNotStartsWithExpression(notStartsWithExpression: NotStartsWithExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notStartsWithExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notStartsWithExpression.value;

            return Fn.isString(propertyValue) ? !propertyValue.startsWith(value) : true;
        };
    }

    /**
     * Visits ends with expression.
     * 
     * @param {EndsWithExpression} endsWithExpression Ends with expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitEndsWithExpression(endsWithExpression: EndsWithExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = endsWithExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = endsWithExpression.value;

            return Fn.isString(propertyValue) ? propertyValue.endsWith(value) : false;
        };
    }

    /**
     * Visits not ends with expression.
     * 
     * @param {NotEndsWithExpression} notEndsWithExpression Not ends with expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitNotEndsWithExpression(notEndsWithExpression: NotEndsWithExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notEndsWithExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notEndsWithExpression.value;

            return Fn.isString(propertyValue) ? !propertyValue.endsWith(value) : true;
        };
    }

    /**
     * Visits and expression.
     * 
     * @param {AndExpression} andExpression And expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitAndExpression(andExpression: AndExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            for (const filterExpression of andExpression.filterExpressions)
            {
                const filterPredicate = filterExpression.accept(this);

                if (!filterPredicate(entity))
                {
                    return false;
                }
            }

            return true;
        };
    }

    /**
     * Visits or expression.
     * 
     * @param {OrExpression} orExpression Or expression.
     * 
     * @returns {InMemoryFilterPredicate<TEntity>} Expression result.
     */
    public visitOrExpression(orExpression: OrExpression): InMemoryFilterPredicate<TEntity>
    {
        return (entity: TEntity) => 
        {
            for (const filterExpression of orExpression.filterExpressions)
            {
                const filterPredicate = filterExpression.accept(this);

                if (filterPredicate(entity))
                {
                    return true;
                }
            }

            return false;
        };
    }
}
