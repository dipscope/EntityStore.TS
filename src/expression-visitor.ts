import { AndFilterExpression } from './expressions/and-filter-expression';
import { AndIncludeExpression } from './expressions/and-include-expression';
import { ContainsExpression } from './expressions/contains-expression';
import { EagerLoadingExpression } from './expressions/eager-loading-expression';
import { EndsWithExpression } from './expressions/ends-with-expression';
import { EqExpression } from './expressions/eq-expression';
import { GtExpression } from './expressions/gt-expression';
import { GteExpression } from './expressions/gte-expression';
import { InExpression } from './expressions/in-expression';
import { LtExpression } from './expressions/lt-expression';
import { LteExpression } from './expressions/lte-expression';
import { NotContainsExpression } from './expressions/not-contains-expression';
import { NotEndsWithExpression } from './expressions/not-ends-with-expression';
import { NotEqExpression } from './expressions/not-eq-expression';
import { NotInExpression } from './expressions/not-in-expression';
import { NotStartsWithExpression } from './expressions/not-starts-with-expression';
import { OrFilterExpression } from './expressions/or-filter-expression';
import { OrderExpression } from './expressions/order-expression';
import { StartsWithExpression } from './expressions/starts-with-expression';

/**
 * Expression visitor which traverses expression tree and returns a result.
 * 
 * @type {ExpressionVisitor<TResult>}
 */
export interface ExpressionVisitor<TResult>
{
    /**
     * Visits equal expression.
     * 
     * @param {EqExpression} eqExpression Equal expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitEqExpression(eqExpression: EqExpression): TResult;

    /**
     * Visits not equal expression.
     * 
     * @param {NotEqExpression} notEqExpression Not equal expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotEqExpression(notEqExpression: NotEqExpression): TResult;

    /**
     * Visits in expression.
     * 
     * @param {InExpression} inExpression In expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitInExpression(inExpression: InExpression): TResult;

    /**
     * Visits not in expression.
     * 
     * @param {NotInExpression} notInExpression Not in expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotInExpression(notInExpression: NotInExpression): TResult;

    /**
     * Visits greater than expression.
     * 
     * @param {GtExpression} gtExpression Greater than expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitGtExpression(gtExpression: GtExpression): TResult;

    /**
     * Visits greater than or equal expression.
     * 
     * @param {GteExpression} gteExpression Greater than or equal expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitGteExpression(gteExpression: GteExpression): TResult;

    /**
     * Visits lower than expression.
     * 
     * @param {LtExpression} ltExpression Lower than expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitLtExpression(ltExpression: LtExpression): TResult;

    /**
     * Visits lower than or equal expression.
     * 
     * @param {LteExpression} lteExpression Lower than or equal expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitLteExpression(lteExpression: LteExpression): TResult;

    /**
     * Visits contains expression.
     * 
     * @param {ContainsExpression} containsExpression Contains expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitContainsExpression(containsExpression: ContainsExpression): TResult;

    /**
     * Visits not contains expression.
     * 
     * @param {NotContainsExpression} notContainsExpression Not contains expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotContainsExpression(notContainsExpression: NotContainsExpression): TResult;

    /**
     * Visits starts with expression.
     * 
     * @param {StartsWithExpression} startsWithExpression Starts with expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitStartsWithExpression(startsWithExpression: StartsWithExpression): TResult;

    /**
     * Visits not starts with expression.
     * 
     * @param {NotStartsWithExpression} notStartsWithExpression Not starts with expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotStartsWithExpression(notStartsWithExpression: NotStartsWithExpression): TResult;

    /**
     * Visits ends with expression.
     * 
     * @param {EndsWithExpression} endsWithExpression Ends with expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitEndsWithExpression(endsWithExpression: EndsWithExpression): TResult;

    /**
     * Visits not ends with expression.
     * 
     * @param {NotEndsWithExpression} notEndsWithExpression Not ends with expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitNotEndsWithExpression(notEndsWithExpression: NotEndsWithExpression): TResult;

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

    /**
     * Visits eager loading expression.
     * 
     * @param {EagerLoadingExpression} eagerLoadingExpression Eager loading expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitEagerLoadingExpression(eagerLoadingExpression: EagerLoadingExpression): TResult;

    /**
     * Visits and include expression.
     * 
     * @param {AndIncludeExpression} andIncludeExpression And include expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitAndIncludeExpression(andIncludeExpression: AndIncludeExpression): TResult;

    /**
     * Visits order expression.
     * 
     * @param {OrderExpression} orderExpression Order expression.
     * 
     * @returns {TResult} Expression result.
     */
    visitOrderExpression(orderExpression: OrderExpression): TResult;
}
