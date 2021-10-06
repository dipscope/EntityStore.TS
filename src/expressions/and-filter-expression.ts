import { ExpressionVisitor } from '../expression-visitor';
import { FilterExpression } from './filter-expression';

/**
 * And filter expression.
 * 
 * @type {AndFilterExpression}
 */
export class AndFilterExpression extends FilterExpression
{
    /**
     * Array of underlying filter expressions.
     * 
     * @type {ReadonlyArray<FilterExpression>}
     */
    public readonly filterExpressions: ReadonlyArray<FilterExpression>;

    /**
     * Constructor.
     * 
     * @param {FilterExpression} firstFilterExpression First filter expression.
     * @param {FilterExpression} secondFilterExpression Second filter expression.
     * @param {ReadonlyArray<FilterExpression>} restFilterExpressions Rest filter expressions.
     */
    public constructor(firstFilterExpression: FilterExpression, secondFilterExpression: FilterExpression, ...restFilterExpressions: ReadonlyArray<FilterExpression>) 
    {
        super();

        this.filterExpressions = new Array<FilterExpression>(firstFilterExpression, secondFilterExpression, ...restFilterExpressions);

        return;
    }

    /**
     * Accepts a certain expression visitor.
     * 
     * @param {ExpressionVisitor<TResult>} expressionVisitor Expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Expression visitor result.
     */
    public accept<TResult>(expressionVisitor: ExpressionVisitor<TResult>): TResult
    {
        return expressionVisitor.visitAndFilterExpression(this);
    }
}
