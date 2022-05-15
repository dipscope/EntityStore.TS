import { Fn } from '@dipscope/type-manager/core';

import { IncludeExpression } from '../../include-expression';
import { IncludeExpressionVisitor } from '../../include-expression-visitor';
import { JsonApiExpressionVisitor } from './json-api-expression-visitor';

/**
 * Json api include expression visitor which traverses expression tree and returns a result.
 * 
 * @type {JsonApiIncludeExpressionVisitor}
 */
export class JsonApiIncludeExpressionVisitor extends JsonApiExpressionVisitor implements IncludeExpressionVisitor<string>
{
    /**
     * Constructor.
     */
    public constructor()
    {
        super('include=');

        return;
    }

    /**
     * Visits include expression.
     * 
     * @param {IncludeExpression} includeExpression Include expression.
     * 
     * @returns {string} Expression result.
     */
    public visitIncludeExpression(includeExpression: IncludeExpression): string
    {
        const propertyPath = includeExpression.propertyInfo.extractSerializedPropertyPath().join('.');

        if (Fn.isNil(includeExpression.parentIncludeExpression))
        {
            return propertyPath;
        }
        
        const parentInclude = this.visitIncludeExpression(includeExpression.parentIncludeExpression);
        const separator = Fn.isNil(includeExpression.entityInfo) ? '.' : ',';

        return `${parentInclude}${separator}${propertyPath}`;
    }
}
