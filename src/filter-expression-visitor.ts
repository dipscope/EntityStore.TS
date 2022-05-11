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

/**
 * Visitor to traverse filter expression tree.
 * 
 * @type {FilterExpressionVisitor<TResult>}
 */
export interface FilterExpressionVisitor<TResult>
{
    /**
     * Visits equal filter expression.
     * 
     * @param {EqFilterExpression} eqFilterExpression Equal filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitEqFilterExpression(eqFilterExpression: EqFilterExpression): TResult;

    /**
     * Visits not equal filter expression.
     * 
     * @param {NotEqFilterExpression} notEqFilterExpression Not equal filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotEqFilterExpression(notEqFilterExpression: NotEqFilterExpression): TResult;

    /**
     * Visits in filter expression.
     * 
     * @param {InFilterExpression} inFilterExpression In filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitInFilterExpression(inFilterExpression: InFilterExpression): TResult;

    /**
     * Visits not in filter expression.
     * 
     * @param {NotInFilterExpression} notInFilterExpression Not in filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotInFilterExpression(notInFilterExpression: NotInFilterExpression): TResult;

    /**
     * Visits greater than filter expression.
     * 
     * @param {GtFilterExpression} gtFilterExpression Greater than filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitGtFilterExpression(gtFilterExpression: GtFilterExpression): TResult;

    /**
     * Visits greater than or equal filter expression.
     * 
     * @param {GteFilterExpression} gteFilterExpression Greater than or equal filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitGteFilterExpression(gteFilterExpression: GteFilterExpression): TResult;

    /**
     * Visits lower than filter expression.
     * 
     * @param {LtFilterExpression} ltFilterExpression Lower than filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitLtFilterExpression(ltFilterExpression: LtFilterExpression): TResult;

    /**
     * Visits lower than or equal filter expression.
     * 
     * @param {LteFilterExpression} lteFilterExpression Lower than or equal filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitLteFilterExpression(lteFilterExpression: LteFilterExpression): TResult;

    /**
     * Visits contains filter expression.
     * 
     * @param {ContainsFilterExpression} containsFilterExpression Contains filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitContainsFilterExpression(containsFilterExpression: ContainsFilterExpression): TResult;

    /**
     * Visits not contains filter expression.
     * 
     * @param {NotContainsFilterExpression} notContainsFilterExpression Not contains filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotContainsFilterExpression(notContainsFilterExpression: NotContainsFilterExpression): TResult;

    /**
     * Visits starts with filter expression.
     * 
     * @param {StartsWithFilterExpression} startsWithFilterExpression Starts with filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitStartsWithFilterExpression(startsWithFilterExpression: StartsWithFilterExpression): TResult;

    /**
     * Visits not starts with filter expression.
     * 
     * @param {NotStartsWithFilterExpression} notStartsWithFilterExpression Not starts with filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotStartsWithFilterExpression(notStartsWithFilterExpression: NotStartsWithFilterExpression): TResult;

    /**
     * Visits ends with filter expression.
     * 
     * @param {EndsWithFilterExpression} endsWithFilterExpression Ends with filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitEndsWithFilterExpression(endsWithFilterExpression: EndsWithFilterExpression): TResult;

    /**
     * Visits not ends with filter expression.
     * 
     * @param {NotEndsWithFilterExpression} notEndsWithFilterExpression Not ends with filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotEndsWithFilterExpression(notEndsWithFilterExpression: NotEndsWithFilterExpression): TResult;

    /**
     * Visits and filter expression.
     * 
     * @param {AndFilterExpression} andFilterExpression And filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitAndFilterExpression(andFilterExpression: AndFilterExpression): TResult;

    /**
     * Visits or filter expression.
     * 
     * @param {OrFilterExpression} orFilterExpression Or filter expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitOrFilterExpression(orFilterExpression: OrFilterExpression): TResult;
}
