import { OrderByDirection } from './order-by-direction';
import { PropertyInfo } from './property-info';

export class OrderByExpression
{
    public readonly propertyInfo: PropertyInfo<any>;
    public readonly orderByDirection: OrderByDirection;

    public constructor(propertyInfo: PropertyInfo<any>, orderByDirection: OrderByDirection)
    {
        this.propertyInfo = propertyInfo;
        this.orderByDirection = orderByDirection;

        return;
    }
}
