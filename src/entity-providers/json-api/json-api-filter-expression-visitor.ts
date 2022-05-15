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
import { JsonApiExpressionVisitor } from './json-api-expression-visitor';

/**
 * Json api filter expression visitor which traverses expression tree and returns a result.
 * 
 * @type {JsonApiFilterExpressionVisitor}
 */
export abstract class JsonApiFilterExpressionVisitor extends JsonApiExpressionVisitor implements FilterExpressionVisitor<string>
{
    /**
     * Constructor.
     * 
     * @param {string} prefix Prefix which prepended right before returned result.
     */
    public constructor(prefix: string)
    {
        super(prefix);

        return;
    }
    
    /**
     * Visits equal filter expression.
     * 
     * @param {EqFilterExpression} eqFilterExpression Equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitEqFilterExpression(eqFilterExpression: EqFilterExpression): string;

    /**
     * Visits not equal filter expression.
     * 
     * @param {NotEqFilterExpression} notEqFilterExpression Not equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotEqFilterExpression(notEqFilterExpression: NotEqFilterExpression): string;

    /**
     * Visits in filter expression.
     * 
     * @param {InFilterExpression} inFilterExpression In filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitInFilterExpression(inFilterExpression: InFilterExpression): string;

    /**
     * Visits not in filter expression.
     * 
     * @param {NotInFilterExpression} notInFilterExpression Not in filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotInFilterExpression(notInFilterExpression: NotInFilterExpression): string;

    /**
     * Visits greater than filter expression.
     * 
     * @param {GtFilterExpression} gtFilterExpression Greater than filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitGtFilterExpression(gtFilterExpression: GtFilterExpression): string;

    /**
     * Visits greater than or equal filter expression.
     * 
     * @param {GteFilterExpression} gteFilterExpression Greater than or equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitGteFilterExpression(gteFilterExpression: GteFilterExpression): string;

    /**
     * Visits lower than filter expression.
     * 
     * @param {LtFilterExpression} ltFilterExpression Lower than filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitLtFilterExpression(ltFilterExpression: LtFilterExpression): string;

    /**
     * Visits lower than or equal filter expression.
     * 
     * @param {LteFilterExpression} lteFilterExpression Lower than or equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitLteFilterExpression(lteFilterExpression: LteFilterExpression): string;

    /**
     * Visits contains filter expression.
     * 
     * @param {ContainsFilterExpression} containsFilterExpression Contains filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitContainsFilterExpression(containsFilterExpression: ContainsFilterExpression): string;

    /**
     * Visits not contains filter expression.
     * 
     * @param {NotContainsFilterExpression} notContainsFilterExpression Not contains filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotContainsFilterExpression(notContainsFilterExpression: NotContainsFilterExpression): string;

    /**
     * Visits starts with filter expression.
     * 
     * @param {StartsWithFilterExpression} startsWithFilterExpression Starts with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitStartsWithFilterExpression(startsWithFilterExpression: StartsWithFilterExpression): string;

    /**
     * Visits not starts with filter expression.
     * 
     * @param {NotStartsWithFilterExpression} notStartsWithFilterExpression Not starts with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotStartsWithFilterExpression(notStartsWithFilterExpression: NotStartsWithFilterExpression): string;

    /**
     * Visits ends with filter expression.
     * 
     * @param {EndsWithFilterExpression} endsWithFilterExpression Ends with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitEndsWithFilterExpression(endsWithFilterExpression: EndsWithFilterExpression): string;

    /**
     * Visits not ends with filter expression.
     * 
     * @param {NotEndsWithFilterExpression} notEndsWithFilterExpression Not ends with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotEndsWithFilterExpression(notEndsWithFilterExpression: NotEndsWithFilterExpression): string;

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
}
