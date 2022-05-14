import { Fn } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { EntityFilterFn } from '../../entity-filter-fn';
import { FilterExpressionVisitor } from '../../filter-expression-visitor';
import { AndFilterExpression } from '../../filter-expressions/and-filter-expression';
import { ContainsFilterExpression } from '../../filter-expressions/contains-filter-expression';
import { EndsWithFilterExpression } from '../../filter-expressions/ends-with-filter-expression';
import { EqFilterExpression } from '../../filter-expressions/eq-filter-expression';
import { GtFilterExpression } from '../../filter-expressions/gt-filter-expression';
import { GteFilterExpression } from '../../filter-expressions/gte-filter-expression';
import { InFilterExpression } from '../../filter-expressions/in-filter-expression';
import { LtFilterExpression } from '../../filter-expressions/lt-filter-expression';
import { LteFilterExpression } from '../../filter-expressions/lte-filter-expression';
import { NotContainsFilterExpression } from '../../filter-expressions/not-contains-filter-expression';
import { NotEndsWithFilterExpression } from '../../filter-expressions/not-ends-with-filter-expression';
import { NotEqFilterExpression } from '../../filter-expressions/not-eq-filter-expression';
import { NotInFilterExpression } from '../../filter-expressions/not-in-filter-expression';
import { NotStartsWithFilterExpression } from '../../filter-expressions/not-starts-with-filter-expression';
import { OrFilterExpression } from '../../filter-expressions/or-filter-expression';
import { StartsWithFilterExpression } from '../../filter-expressions/starts-with-filter-expression';

/**
 * In memory filter expression visitor which traverses expression tree and returns a result.
 * 
 * @type {InMemoryFilterExpressionVisitor<TEntity>}
 */
export class InMemoryFilterExpressionVisitor<TEntity extends Entity> implements FilterExpressionVisitor<EntityFilterFn<TEntity>>
{
    /**
     * Visits equal filter expression.
     * 
     * @param {EqFilterExpression} eqFilterExpression Equal filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitEqFilterExpression(eqFilterExpression: EqFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = eqFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = eqFilterExpression.value;

            return propertyValue === value;
        };
    }

    /**
     * Visits not equal filter expression.
     * 
     * @param {NotEqFilterExpression} notEqFilterExpression Not equal filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitNotEqFilterExpression(notEqFilterExpression: NotEqFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notEqFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notEqFilterExpression.value;

            return propertyValue !== value;
        };
    }

    /**
     * Visits in filter expression.
     * 
     * @param {InFilterExpression} inFilterExpression In filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitInFilterExpression(inFilterExpression: InFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = inFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const values = inFilterExpression.values;

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
     * Visits not in filter expression.
     * 
     * @param {NotInFilterExpression} notInFilterExpression Not in filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitNotInFilterExpression(notInFilterExpression: NotInFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notInFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const values = notInFilterExpression.values;

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
     * Visits greater than filter expression.
     * 
     * @param {GtFilterExpression} gtFilterExpression Greater than filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitGtFilterExpression(gtFilterExpression: GtFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = gtFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = gtFilterExpression.value;

            return propertyValue > value;
        };
    }

    /**
     * Visits greater than or equal filter expression.
     * 
     * @param {GteFilterExpression} gteFilterExpression Greater than or equal filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitGteFilterExpression(gteFilterExpression: GteFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = gteFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = gteFilterExpression.value;

            return propertyValue >= value;
        };
    }

    /**
     * Visits lower than filter expression.
     * 
     * @param {LtFilterExpression} ltFilterExpression Lower than filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitLtFilterExpression(ltFilterExpression: LtFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = ltFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = ltFilterExpression.value;

            return propertyValue < value;
        };
    }

    /**
     * Visits lower than or equal filter expression.
     * 
     * @param {LteFilterExpression} lteFilterExpression Lower than or equal filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitLteFilterExpression(lteFilterExpression: LteFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = lteFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = lteFilterExpression.value;

            return propertyValue <= value;
        };
    }

    /**
     * Visits contains filter expression.
     * 
     * @param {ContainsFilterExpression} containsFilterExpression Contains filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitContainsFilterExpression(containsFilterExpression: ContainsFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = containsFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = containsFilterExpression.value;

            return Fn.isString(propertyValue) ? propertyValue.includes(value) : false;
        };
    }

    /**
     * Visits not contains filter expression.
     * 
     * @param {NotContainsFilterExpression} notContainsFilterExpression Not contains filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitNotContainsFilterExpression(notContainsFilterExpression: NotContainsFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notContainsFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notContainsFilterExpression.value;

            return Fn.isString(propertyValue) ? !propertyValue.includes(value) : true;
        };
    }

    /**
     * Visits starts with filter expression.
     * 
     * @param {StartsWithFilterExpression} startsWithFilterExpression Starts with filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitStartsWithFilterExpression(startsWithFilterExpression: StartsWithFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = startsWithFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = startsWithFilterExpression.value;

            return Fn.isString(propertyValue) ? propertyValue.startsWith(value) : false;
        };
    }

    /**
     * Visits not starts with filter expression.
     * 
     * @param {NotStartsWithFilterExpression} notStartsWithFilterExpression Not starts with filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitNotStartsWithFilterExpression(notStartsWithFilterExpression: NotStartsWithFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notStartsWithFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notStartsWithFilterExpression.value;

            return Fn.isString(propertyValue) ? !propertyValue.startsWith(value) : true;
        };
    }

    /**
     * Visits ends with filter expression.
     * 
     * @param {EndsWithFilterExpression} endsWithFilterExpression Ends with filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitEndsWithFilterExpression(endsWithFilterExpression: EndsWithFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = endsWithFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = endsWithFilterExpression.value;

            return Fn.isString(propertyValue) ? propertyValue.endsWith(value) : false;
        };
    }

    /**
     * Visits not ends with filter expression.
     * 
     * @param {NotEndsWithFilterExpression} notEndsWithFilterExpression Not ends with filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitNotEndsWithFilterExpression(notEndsWithFilterExpression: NotEndsWithFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity) => 
        {
            const propertyInfo = notEndsWithFilterExpression.propertyInfo;
            const propertyValue = propertyInfo.extractPropertyValue(entity);
            const value = notEndsWithFilterExpression.value;

            return Fn.isString(propertyValue) ? !propertyValue.endsWith(value) : true;
        };
    }

    /**
     * Visits and filter expression.
     * 
     * @param {AndFilterExpression} andFilterExpression And filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitAndFilterExpression(andFilterExpression: AndFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity, index: number, entities: ReadonlyArray<TEntity>) => 
        {
            for (const filterExpression of andFilterExpression.filterExpressions)
            {
                const entityFilterFn = filterExpression.accept(this);

                if (!entityFilterFn(entity, index, entities))
                {
                    return false;
                }
            }

            return true;
        };
    }

    /**
     * Visits or filter expression.
     * 
     * @param {OrFilterExpression} orFilterExpression Or filter expression.
     * 
     * @returns {EntityFilterFn<TEntity>} Expression result.
     */
    public visitOrFilterExpression(orFilterExpression: OrFilterExpression): EntityFilterFn<TEntity>
    {
        return (entity: TEntity, index: number, entities: ReadonlyArray<TEntity>) => 
        {
            for (const filterExpression of orFilterExpression.filterExpressions)
            {
                const entityFilterFn = filterExpression.accept(this);
                
                if (entityFilterFn(entity, index, entities))
                {
                    return true;
                }
            }

            return false;
        };
    }
}
