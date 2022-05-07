import { Fn } from '@dipscope/type-manager/core';

import { AndFilterExpression } from '../../../expressions/and-filter-expression';
import { AndIncludeExpression } from '../../../expressions/and-include-expression';
import { ContainsExpression } from '../../../expressions/contains-expression';
import { EagerLoadingExpression } from '../../../expressions/eager-loading-expression';
import { EndsWithExpression } from '../../../expressions/ends-with-expression';
import { EqExpression } from '../../../expressions/eq-expression';
import { GtExpression } from '../../../expressions/gt-expression';
import { GteExpression } from '../../../expressions/gte-expression';
import { InExpression } from '../../../expressions/in-expression';
import { IncludeExpression } from '../../../expressions/include-expression';
import { LtExpression } from '../../../expressions/lt-expression';
import { LteExpression } from '../../../expressions/lte-expression';
import { NotContainsExpression } from '../../../expressions/not-contains-expression';
import { NotEndsWithExpression } from '../../../expressions/not-ends-with-expression';
import { NotEqExpression } from '../../../expressions/not-eq-expression';
import { NotInExpression } from '../../../expressions/not-in-expression';
import { NotStartsWithExpression } from '../../../expressions/not-starts-with-expression';
import { OrFilterExpression } from '../../../expressions/or-filter-expression';
import { OrderExpression } from '../../../expressions/order-expression';
import { StartsWithExpression } from '../../../expressions/starts-with-expression';
import { OrderDirection } from '../../../order-direction';
import { JsonApiExpressionVisitor } from '../json-api-expression-visitor';

/**
 * Json api net expression visitor implementation.
 * 
 * @type {JsonApiNetExpressionVisitor}
 */
export class JsonApiNetExpressionVisitor extends JsonApiExpressionVisitor
{
    /**
     * Formats value for filtering.
     * 
     * @param {any} value Value to format.
     * 
     * @returns {string} Formatted value.
     */
    protected formatValue(value: any): string
    {
        if (Fn.isNil(value))
        {
            return 'null';
        }

        return `'${value}'`;
    }

    /**
     * Defines filter prefix which prepended right before returned result.
     * 
     * @type {string} Filter prefix to prepend.
     */
    public defineFilterPrefix(): string 
    {
        return 'filter=';
    }

    /**
     * Defines order prefix which prepended right before returned result.
     * 
     * @type {string} Order prefix to prepend.
     */
    public defineOrderPrefix(): string
    {
        return 'sort=';
    }

    /**
     * Defines include prefix which prepended right before returned result.
     * 
     * @type {string} Include prefix to prepend.
     */
    public defineIncludePrefix(): string
    {
        return 'include=';
    }

    /**
     * Visits equal expression.
     * 
     * @param {EqExpression} eqExpression Equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEqExpression(eqExpression: EqExpression): string
    {
        const propertyPath = this.extractPropertyPath(eqExpression.propertyInfo).join('.');
        const value = this.formatValue(eqExpression.value);

        return `equals(${propertyPath}, ${value})`;
    }

    /**
     * Visits not equal expression.
     * 
     * @param {NotEqExpression} notEqExpression Not equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotEqExpression(notEqExpression: NotEqExpression): string
    {
        const propertyPath = this.extractPropertyPath(notEqExpression.propertyInfo).join('.');
        const value = this.formatValue(notEqExpression.value);

        return `not(equals(${propertyPath}, ${value}))`;
    }

    /**
     * Visits in expression.
     * 
     * @param {InExpression} inExpression In expression.
     * 
     * @returns {string} Expression result.
     */
    public visitInExpression(inExpression: InExpression): string
    {
        const propertyPath = this.extractPropertyPath(inExpression.propertyInfo).join('.');
        const value = inExpression.values.map(v => this.formatValue(v)).join(',');
        
        return `any(${propertyPath}, ${value}))`;
    }

    /**
     * Visits not in expression.
     * 
     * @param {NotInExpression} notInExpression Not in expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotInExpression(notInExpression: NotInExpression): string
    {
        const propertyPath = this.extractPropertyPath(notInExpression.propertyInfo).join('.');
        const value = notInExpression.values.map(v => this.formatValue(v)).join(',');
        
        return `not(any(${propertyPath}, ${value})))`;
    }

    /**
     * Visits greater than expression.
     * 
     * @param {GtExpression} gtExpression Greater than expression.
     * 
     * @returns {string} Expression result.
     */
    public visitGtExpression(gtExpression: GtExpression): string
    {
        const propertyPath = this.extractPropertyPath(gtExpression.propertyInfo).join('.');
        const value = this.formatValue(gtExpression.value);

        return `greaterThan(${propertyPath}, ${value})`;
    }

    /**
     * Visits greater than or equal expression.
     * 
     * @param {GteExpression} gteExpression Greater than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitGteExpression(gteExpression: GteExpression): string
    {
        const propertyPath = this.extractPropertyPath(gteExpression.propertyInfo).join('.');
        const value = this.formatValue(gteExpression.value);

        return `greaterOrEqual(${propertyPath}, ${value})`;
    }

    /**
     * Visits lower than expression.
     * 
     * @param {LtExpression} ltExpression Lower than expression.
     * 
     * @returns {string} Expression result.
     */
    public visitLtExpression(ltExpression: LtExpression): string
    {
        const propertyPath = this.extractPropertyPath(ltExpression.propertyInfo).join('.');
        const value = this.formatValue(ltExpression.value);

        return `lessThan(${propertyPath}, ${value})`;
    }

    /**
     * Visits lower than or equal expression.
     * 
     * @param {LteExpression} lteExpression Lower than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitLteExpression(lteExpression: LteExpression): string
    {
        const propertyPath = this.extractPropertyPath(lteExpression.propertyInfo).join('.');
        const value = this.formatValue(lteExpression.value);

        return `lessOrEqual(${propertyPath}, ${value})`;
    }

    /**
     * Visits contains expression.
     * 
     * @param {ContainsExpression} containsExpression Contains expression.
     * 
     * @returns {string} Expression result.
     */
    public visitContainsExpression(containsExpression: ContainsExpression): string
    {
        const propertyPath = this.extractPropertyPath(containsExpression.propertyInfo).join('.');
        const value = this.formatValue(containsExpression.value);

        return `contains(${propertyPath}, ${value})`;
    }

    /**
     * Visits not contains expression.
     * 
     * @param {NotContainsExpression} notContainsExpression Not contains expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotContainsExpression(notContainsExpression: NotContainsExpression): string
    {
        const propertyPath = this.extractPropertyPath(notContainsExpression.propertyInfo).join('.');
        const value = this.formatValue(notContainsExpression.value);

        return `not(contains(${propertyPath}, ${value}))`;
    }

    /**
     * Visits starts with expression.
     * 
     * @param {StartsWithExpression} startsWithExpression Starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitStartsWithExpression(startsWithExpression: StartsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(startsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(startsWithExpression.value);

        return `startsWith(${propertyPath}, ${value})`;
    }

    /**
     * Visits not starts with expression.
     * 
     * @param {NotStartsWithExpression} notStartsWithExpression Not starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotStartsWithExpression(notStartsWithExpression: NotStartsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(notStartsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(notStartsWithExpression.value);

        return `not(startsWith(${propertyPath}, ${value}))`;
    }

    /**
     * Visits ends with expression.
     * 
     * @param {EndsWithExpression} endsWithExpression Ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEndsWithExpression(endsWithExpression: EndsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(endsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(endsWithExpression.value);

        return `endsWith(${propertyPath}, ${value})`;
    }

    /**
     * Visits not ends with expression.
     * 
     * @param {NotEndsWithExpression} notEndsWithExpression Not ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotEndsWithExpression(notEndsWithExpression: NotEndsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(notEndsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(notEndsWithExpression.value);

        return `not(endsWith(${propertyPath}, ${value}))`;
    }

    /**
     * Visits and filter expression.
     * 
     * @param {AndFilterExpression} andFilterExpression And filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitAndFilterExpression(andFilterExpression: AndFilterExpression): string
    {
        const filters = andFilterExpression.filterExpressions.map(e => e.accept(this)).join(',');

        return `and(${filters})`;
    }

    /**
     * Visits or filter expression.
     * 
     * @param {OrFilterExpression} orFilterExpression Or filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitOrFilterExpression(orFilterExpression: OrFilterExpression): string
    {
        const filters = orFilterExpression.filterExpressions.map(e => e.accept(this)).join(',');

        return `or(${filters})`;
    }

    /**
     * Visits eager loading expression.
     * 
     * @param {EagerLoadingExpression} eagerLoadingExpression Eager loading expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEagerLoadingExpression(eagerLoadingExpression: EagerLoadingExpression): string
    {
        return '';
    }

    /**
     * Visits and include expression.
     * 
     * @param {AndIncludeExpression} andIncludeExpression And include expression.
     * 
     * @returns {string} Expression result.
     */
    public visitAndIncludeExpression(andIncludeExpression: AndIncludeExpression): string
    {
        return '';
    }

    /**
     * Visits order expression.
     * 
     * @param {OrderExpression} orderExpression Order expression.
     * 
     * @returns {string} Expression result.
     */
    public visitOrderExpression(orderExpression: OrderExpression): string
    {
        const orderSign = orderExpression.orderDirection === OrderDirection.Asc ? '' : '-';
        const propertyName = orderExpression.propertyInfo.propertyMetadata.propertyName;

        return `sort=${orderSign}${propertyName}`;
    }
}
