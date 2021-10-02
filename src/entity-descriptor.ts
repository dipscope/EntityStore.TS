import { PropertyMetadata, TypeMetadata } from '@dipscope/type-manager/core';

export type EntityInfoProxy<TEntity> = {
    [TProperty in keyof TEntity]: PropertyInfoProxy<TEntity, TEntity[TProperty]>;
} & {
    readonly $typeMetadata: TypeMetadata<TEntity>;
};

export type PropertyInfoProxy<TEntity, TProperty> = {
    [TChildProperty in keyof TProperty]: PropertyInfoProxy<TProperty, TProperty[TChildProperty]>;
} & {
    readonly $typeMetadata: TypeMetadata<TEntity>;
    readonly $propertyMetadata: PropertyMetadata<TEntity, TProperty>;
};

export class TypeMetadataAccessorHandler<TEntity extends Record<string, any>> implements ProxyHandler<TEntity>
{
    public typeMetadata: TypeMetadata<TEntity>;

    public constructor(typeMetadata: TypeMetadata<TEntity>) 
    {
        this.typeMetadata = typeMetadata;

        return;
    }

    public get(target: TEntity, propertyKey: PropertyKey): EntityPropertyProxy<TEntity, any> 
    {
        const propertyMetadata = this.typeMetadata.propertyMetadataMap.get(String(propertyKey));

        if (propertyMetadata) 
        {
            // new Proxy({ $typeMetadata: typeMetadata } as TypeMetadataAccessor<TEntity>, new EntityDescriptorHandler(typeMetadata)); !!!
            return new Proxy({}, new EntityPropertyProxy<TEntity, any>(propertyMetadata));
        }

        throw new Error();
    }

    public set(target: TEntity, propertyKey: PropertyKey, value: any): void 
    {
        throw new Error();
    }
}

export class EntityPropertyProxy<TEntity, TEntityProperty> implements ProxyHandler<TEntityProperty>
{
    public propertyMetadata: PropertyMetadata<TEntity, TEntityProperty>;
    public typeMetadata: TypeMetadata<TEntityProperty>;
    
    public constructor(propertyMetadata: PropertyMetadata<TEntity, TEntityProperty>)
    {
        this.propertyMetadata = propertyMetadata;
        this.typeMetadata = propertyMetadata.typeMetadata;

        return;
    }

    public get(target: TEntity, propertyKey: PropertyKey): EntityPropertyProxy<TEntityProperty, any> 
    {
        const propertyMetadata = this.typeMetadata.propertyMetadataMap.get(String(propertyKey));

        if (propertyMetadata) 
        {
            return new EntityPropertyProxy<TEntityProperty, any>(propertyMetadata);
        }

        throw new Error();
    }

    public set(target: TEntity, propertyKey: PropertyKey, value: any): void 
    {
        throw new Error();
    }
}
