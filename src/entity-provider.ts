export type EntityDescriptor<TEntity> = {
    [TEntity in keyof TEntity]: PropertyProxy<T, T[P]>;
};
