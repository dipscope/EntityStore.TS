import { PropertyMetadata } from '@dipscope/type-manager/core';

export type Proxy<T> = {
    get(): T;
    set(value: T): void;
};

export type EntityDescriptor<TEntity> = {
    [TEntity in keyof TEntity]: PropertyProxy<T, T[P]>;
};

export type EntityPropertyDescriptor<TEntityProxy, TPropertyType> = EntityProxy<T> & {
    propertyMetadata: PropertyMetadata<any, any>;
}

export class Ff 
{
    public eq(): string 
    {
        return '';
    }
}

export type FilterableProperty<T> = EntityProxy<T> & Ff;

// where((e, eb) => eb.and(eb.eq(e.name, 'John'), eb.gt(e.status.rank, 10)))

// entity -> entity.propertyMap['name'].typeMetadata.propertyMap['name']
// e -> type -> property -> property
