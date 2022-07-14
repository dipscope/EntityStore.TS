import { Entity } from './entity';
import { EntityInfo } from './entity-info';
import { FilterExpression } from './filter-expression';
import { AndFilterExpression } from './filter-expressions/and-filter-expression';
import { ContainsFilterExpression } from './filter-expressions/contains-filter-expression';
import { EndsWithFilterExpression } from './filter-expressions/ends-with-filter-expression';
import { EqFilterExpression } from './filter-expressions/eq-filter-expression';
import { GtFilterExpression } from './filter-expressions/gt-filter-expression';
import { GteFilterExpression } from './filter-expressions/gte-filter-expression';
import { InFilterExpression } from './filter-expressions/in-filter-expression';
import { LtFilterExpression } from './filter-expressions/lt-filter-expression';
import { LteFilterExpression } from './filter-expressions/lte-filter-expression';
import { NotContainsFilterExpression } from './filter-expressions/not-contains-filter-expression';
import { NotEndsWithFilterExpression } from './filter-expressions/not-ends-with-filter-expression';
import { NotEqFilterExpression } from './filter-expressions/not-eq-filter-expression';
import { NotInFilterExpression } from './filter-expressions/not-in-filter-expression';
import { NotStartsWithFilterExpression } from './filter-expressions/not-starts-with-filter-expression';
import { OrFilterExpression } from './filter-expressions/or-filter-expression';
import { StartsWithFilterExpression } from './filter-expressions/starts-with-filter-expression';
import { PropertyInfoProxy } from './property-info-proxy';
import { proxyTargetSymbol } from './proxy-target-symbol';

/**
 * Builder used to build filter expressions.
 * 
 * @type {FilterExpressionBuilder<TEntity>}
 */
export class FilterExpressionBuilder<TEntity extends Entity>
{
    /**
     * Entity info.
     * 
     * @type {EntityInfo<TEntity>}
     */
    public readonly entityInfo: EntityInfo<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     */
    public constructor(entityInfo: EntityInfo<TEntity>)
    {
        this.entityInfo = entityInfo;

        return;
    }

    /**
     * Builds equal filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {EqFilterExpression} Equal filter expression.
     */
    public eq<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): EqFilterExpression
    {
        return new EqFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not equal filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {NotEqFilterExpression} Not equal filter expression.
     */
    public notEq<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): NotEqFilterExpression
    {
        return new NotEqFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds in filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {ReadonlyArray<TProperty>} values Expression values.
     * 
     * @returns {InFilterExpression} In filter expression.
     */
    public in<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, values: ReadonlyArray<TProperty>): InFilterExpression
    {
        return new InFilterExpression(propertyInfoProxy[proxyTargetSymbol], values);
    }

    /**
     * Builds not in filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {ReadonlyArray<TProperty>} values Expression values.
     * 
     * @returns {NotInFilterExpression} Not in filter expression.
     */
    public notIn<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, values: ReadonlyArray<TProperty>): NotInFilterExpression
    {
        return new NotInFilterExpression(propertyInfoProxy[proxyTargetSymbol], values);
    }

    /**
     * Builds greater than filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {GtFilterExpression} Greater than filter expression.
     */
    public gt<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): GtFilterExpression
    {
        return new GtFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }
 
    /**
     * Builds greater than or equal filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {GteFilterExpression} Greater than or equal filter expression.
     */
    public gte<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): GteFilterExpression
    {
        return new GteFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds lower than filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {LtFilterExpression} Lower than filter expression.
     */
    public lt<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): LtFilterExpression
    {
        return new LtFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds lower than or equal filter expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {LteFilterExpression} Lower than or equal filter expression.
     */
    public lte<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): LteFilterExpression
    {
        return new LteFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds contains filter expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {ContainsFilterExpression} Contains filter expression.
     */
    public contains(propertyInfoProxy: PropertyInfoProxy<string>, value: string): ContainsFilterExpression
    {
        return new ContainsFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not contains filter expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {NotContainsFilterExpression} Contains filter expression.
     */
    public notContains(propertyInfoProxy: PropertyInfoProxy<string>, value: string): NotContainsFilterExpression
    {
        return new NotContainsFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds starts with filter expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {StartsWithFilterExpression} Starts with filter expression.
     */
    public startsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): StartsWithFilterExpression
    {
        return new StartsWithFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not starts with filter expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {NotStartsWithFilterExpression} Not starts with filter expression.
     */
    public notStartsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): NotStartsWithFilterExpression
    {
        return new NotStartsWithFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds ends with filter expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {EndsWithFilterExpression} Ends with filter expression.
     */
    public endsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): EndsWithFilterExpression
    {
        return new EndsWithFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not ends with filter expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {NotEndsWithFilterExpression} Not ends with filter expression.
     */
    public notEndsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): NotEndsWithFilterExpression
    {
        return new NotEndsWithFilterExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds and filter expression.
     * 
     * @param {FilterExpression} firstFilterExpression First filter expression.
     * @param {FilterExpression} secondFilterExpression Second filter expression.
     * @param {ReadonlyArray<FilterExpression>} restFilterExpressions Rest filter expressions.
     * 
     * @returns {AndFilterExpression} And filter expression.
     */
    public and(firstFilterExpression: FilterExpression, secondFilterExpression: FilterExpression, ...restFilterExpressions: ReadonlyArray<FilterExpression>): AndFilterExpression
    {
        return new AndFilterExpression(firstFilterExpression, secondFilterExpression, ...restFilterExpressions);
    }
    
    /**
     * Builds or filter expression.
     * 
     * @param {FilterExpression} firstFilterExpression First filter expression.
     * @param {FilterExpression} secondFilterExpression Second filter expression.
     * @param {ReadonlyArray<FilterExpression>} restFilterExpressions Rest filter expressions.
     * 
     * @returns {OrFilterExpression} Or filter expression.
     */
    public or(firstFilterExpression: FilterExpression, secondFilterExpression: FilterExpression, ...restFilterExpressions: ReadonlyArray<FilterExpression>): OrFilterExpression
    {
        return new OrFilterExpression(firstFilterExpression, secondFilterExpression, ...restFilterExpressions);
    }
}
