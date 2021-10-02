import { Fn } from '@dipscope/type-manager/core';

import { Expression } from './expression';
import { AndExpression } from './expressions/and-expression';
import { EqExpression } from './expressions/eq-expression';
import { IncludeExpression } from './include-expression';
import { OrderByDirection } from './order-by-direction';
import { OrderByExpression } from './order-by-expression';
import { PropertyInfo } from './property-info';
import { PropertyInfoProxy } from './property-info-proxy';
import { proxyTarget } from './proxy-target';

export class ExpressionBuilder
{
    private extractPropertyInfo<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>): PropertyInfo<TProperty>
    {
        const anyPropertyInfoProxy = propertyInfoProxy as any;

        return anyPropertyInfoProxy[proxyTarget];
    }

    public eq<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): EqExpression
    {
        return new EqExpression(this.extractPropertyInfo(propertyInfoProxy), value);
    }

    public orderBy<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, orderByDirection: OrderByDirection): OrderByExpression
    {
        return new OrderByExpression(this.extractPropertyInfo(propertyInfoProxy), orderByDirection);
    }

    public include<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>): IncludeExpression
    {
        return new IncludeExpression(this.extractPropertyInfo(propertyInfoProxy));
    }

    public and(firstExpression: Expression, secondExpression: Expression, ...restExpressions: Array<Expression>): AndExpression
    {
        return new AndExpression(firstExpression, secondExpression, ...restExpressions);
    }
}
