import { TypeManager } from '@dipscope/type-manager';

import { EntityCollection } from '../src';

describe('Entity collection serializer', () =>
{
    it('should serialize undefined to array', () =>
    {
        const value = undefined;
        const result = TypeManager.serialize(EntityCollection, value);
        
        expect(result).toBeInstanceOf(Array);
    });

    it('should deserialize undefined to entity collection', () =>
    {
        const value = undefined;
        const result = TypeManager.deserialize(EntityCollection, value);
        
        expect(result).toBeInstanceOf(EntityCollection);
    });

    it('should serialize null to null', () =>
    {
        const value = null;
        const result = TypeManager.serialize(EntityCollection, value);

        expect(result).toBeNull();
    });

    it('should deserialize null to null', () =>
    {
        const value = null;
        const result = TypeManager.deserialize(EntityCollection, value);
        
        expect(result).toBeNull();
    });

    it('should serialize entity collection to array', () =>
    {
        const value = new EntityCollection();
        const result = TypeManager.serialize(EntityCollection, value);
        
        expect(result).toBeInstanceOf(Array);
    });

    it('should deserialize array to entity collection', () =>
    {
        const value = [] as any;
        const result = TypeManager.deserialize(EntityCollection, value);
        
        expect(result).toBeInstanceOf(EntityCollection);
    });
});