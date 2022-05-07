import { Fn } from '@dipscope/type-manager/core';

import { ExpressionVisitor } from '../../expression-visitor';
import { AndFilterExpression } from '../../expressions/and-filter-expression';
import { AndIncludeExpression } from '../../expressions/and-include-expression';
import { ContainsExpression } from '../../expressions/contains-expression';
import { EagerLoadingExpression } from '../../expressions/eager-loading-expression';
import { EndsWithExpression } from '../../expressions/ends-with-expression';
import { EqExpression } from '../../expressions/eq-expression';
import { GtExpression } from '../../expressions/gt-expression';
import { GteExpression } from '../../expressions/gte-expression';
import { InExpression } from '../../expressions/in-expression';
import { IncludeExpression } from '../../expressions/include-expression';
import { LtExpression } from '../../expressions/lt-expression';
import { LteExpression } from '../../expressions/lte-expression';
import { NotContainsExpression } from '../../expressions/not-contains-expression';
import { NotEndsWithExpression } from '../../expressions/not-ends-with-expression';
import { NotEqExpression } from '../../expressions/not-eq-expression';
import { NotInExpression } from '../../expressions/not-in-expression';
import { NotStartsWithExpression } from '../../expressions/not-starts-with-expression';
import { OrFilterExpression } from '../../expressions/or-filter-expression';
import { OrderExpression } from '../../expressions/order-expression';
import { StartsWithExpression } from '../../expressions/starts-with-expression';
import { PropertyInfo } from '../../property-info';

/**
 * Json api expression visitor which traverses expression tree and returns a result.
 * 
 * @type {JsonApiExpressionVisitor}
 */
export abstract class JsonApiExpressionVisitor implements ExpressionVisitor<string>
{
    /**
     * Extracts property path from property info.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info.
     * 
     * @returns {Array<string>} Property path used for filtering and sorting.
     */
    protected extractPropertyPath(propertyInfo: PropertyInfo<any>): Array<string>
    {
        const propertyPath = new Array<string>();

        while (!Fn.isNil(propertyInfo))
        {
            propertyPath.unshift(propertyInfo.propertyMetadata.serializedPropertyName);

            propertyInfo = propertyInfo.parentPropertyInfo as PropertyInfo<any>;
        }

        return propertyPath;
    }

    /**
     * Formats value for filtering.
     * 
     * @param {any} value Value to format.
     * 
     * @returns {string} Formatted value.
     */
    protected abstract formatValue(value: any): string;

    /**
     * Defines filter prefix which prepended right before returned result.
     * 
     * @type {string} Filter prefix to prepend.
     */
    public abstract defineFilterPrefix(): string;

    /**
     * Defines order prefix which prepended right before returned result.
     * 
     * @type {string} Order prefix to prepend.
     */
    public abstract defineOrderPrefix(): string;
 
    /**
     * Defines include prefix which prepended right before returned result.
     * 
     * @type {string} Include prefix to prepend.
     */
    public abstract defineIncludePrefix(): string;

    /**
     * Visits equal expression.
     * 
     * @param {EqExpression} eqExpression Equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitEqExpression(eqExpression: EqExpression): string;

    /**
     * Visits not equal expression.
     * 
     * @param {NotEqExpression} notEqExpression Not equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotEqExpression(notEqExpression: NotEqExpression): string;

    /**
     * Visits in expression.
     * 
     * @param {InExpression} inExpression In expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitInExpression(inExpression: InExpression): string;

    /**
     * Visits not in expression.
     * 
     * @param {NotInExpression} notInExpression Not in expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotInExpression(notInExpression: NotInExpression): string;

    /**
     * Visits greater than expression.
     * 
     * @param {GtExpression} gtExpression Greater than expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitGtExpression(gtExpression: GtExpression): string;

    /**
     * Visits greater than or equal expression.
     * 
     * @param {GteExpression} gteExpression Greater than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitGteExpression(gteExpression: GteExpression): string;

    /**
     * Visits lower than expression.
     * 
     * @param {LtExpression} ltExpression Lower than expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitLtExpression(ltExpression: LtExpression): string;

    /**
     * Visits lower than or equal expression.
     * 
     * @param {LteExpression} lteExpression Lower than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitLteExpression(lteExpression: LteExpression): string;

    /**
     * Visits contains expression.
     * 
     * @param {ContainsExpression} containsExpression Contains expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitContainsExpression(containsExpression: ContainsExpression): string;

    /**
     * Visits not contains expression.
     * 
     * @param {NotContainsExpression} notContainsExpression Not contains expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotContainsExpression(notContainsExpression: NotContainsExpression): string;

    /**
     * Visits starts with expression.
     * 
     * @param {StartsWithExpression} startsWithExpression Starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitStartsWithExpression(startsWithExpression: StartsWithExpression): string;

    /**
     * Visits not starts with expression.
     * 
     * @param {NotStartsWithExpression} notStartsWithExpression Not starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotStartsWithExpression(notStartsWithExpression: NotStartsWithExpression): string;

    /**
     * Visits ends with expression.
     * 
     * @param {EndsWithExpression} endsWithExpression Ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitEndsWithExpression(endsWithExpression: EndsWithExpression): string;

    /**
     * Visits not ends with expression.
     * 
     * @param {NotEndsWithExpression} notEndsWithExpression Not ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotEndsWithExpression(notEndsWithExpression: NotEndsWithExpression): string;

    /**
     * Visits and filter expression.
     * 
     * @param {AndFilterExpression} andFilterExpression And filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitAndFilterExpression(andFilterExpression: AndFilterExpression): string;

    /**
     * Visits or filter expression.
     * 
     * @param {OrFilterExpression} orFilterExpression Or filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitOrFilterExpression(orFilterExpression: OrFilterExpression): string;
    
    /**
     * Visits eager loading expression.
     * 
     * @param {EagerLoadingExpression} eagerLoadingExpression Eager loading expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitEagerLoadingExpression(eagerLoadingExpression: EagerLoadingExpression): string;

    /**
     * Visits and include expression.
     * 
     * @param {AndIncludeExpression} andIncludeExpression And include expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitAndIncludeExpression(andIncludeExpression: AndIncludeExpression): string;

    /**
     * Visits order expression.
     * 
     * @param {OrderExpression} orderExpression Order expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitOrderExpression(orderExpression: OrderExpression): string;
}
