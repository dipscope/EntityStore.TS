import { PaginateExpression } from '../../paginate-expression';
import { PaginateExpressionVisitor } from '../../paginate-expression-visitor';
import { JsonApiExpressionVisitor } from './json-api-expression-visitor';

/**
 * Json api paginate expression visitor which traverses expression tree and returns a result.
 * 
 * @type {JsonApiPaginateExpressionVisitor}
 */
export abstract class JsonApiPaginateExpressionVisitor extends JsonApiExpressionVisitor implements PaginateExpressionVisitor<string>
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
     * Visits paginate expression.
     * 
     * @param {PaginateExpression} paginateExpression Paginate expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitPaginateExpression(paginateExpression: PaginateExpression): string;
}
