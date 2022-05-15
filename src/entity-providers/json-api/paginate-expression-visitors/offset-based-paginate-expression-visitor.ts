import { Fn } from '@dipscope/type-manager/core';

import { PaginateExpression } from '../../../paginate-expression';
import { JsonApiPaginateExpressionVisitor } from '../json-api-paginate-expression-visitor';

/**
 * Offset based paginate expression visitor implementation.
 * 
 * @type {OffsetBasedPaginateExpressionVisitor}
 */
export class OffsetBasedPaginateExpressionVisitor extends JsonApiPaginateExpressionVisitor
{
    /**
     * Constructor.
     */
    public constructor()
    {
        super('');

        return;
    }
    
    /**
     * Visits paginate expression.
     * 
     * @param {PaginateExpression} paginateExpression Paginate expression.
     * 
     * @returns {string} Expression result.
     */
    public visitPaginateExpression(paginateExpression: PaginateExpression): string
    {
        const parts = new Array<string>();

        if (!Fn.isNil(paginateExpression.take))
        {
            parts.push(`page[limit]=${paginateExpression.take}`);
        }

        if (!Fn.isNil(paginateExpression.skip))
        {
            parts.push(`page[offset]=${paginateExpression.skip}`);
        }

        return parts.join('&');
    }
}
