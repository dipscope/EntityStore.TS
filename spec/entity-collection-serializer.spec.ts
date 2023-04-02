import { TypeManager } from '@dipscope/type-manager';
import { EntityCollection } from '../src';
import { User } from './entity-store.spec';

describe('Entity collection serializer', () =>
{
    afterEach(() =>
    {
        TypeManager.applyTypeOptionsBase({
            useDefaultValue: false
        });
    });

    it('should serialize undefined to undefined', () =>
    {
        const user = new User('Dmitry', undefined);
        const result = TypeManager.serialize(User, user);
        
        expect(result.messages).toBeUndefined();
    });

    it('should serialize undefined to array when use default value is enabled', () =>
    {
        TypeManager.applyTypeOptionsBase({
            useDefaultValue: true
        });

        const user = new User('Dmitry', undefined);
        const result = TypeManager.serialize(User, user);
        
        expect(result.messages).toBeInstanceOf(Array);
    });

    it('should deserialize undefined to undefined', () =>
    {
        const user = { name: 'Dmitry', messages: undefined };
        const result = TypeManager.deserialize(User, user);
        
        expect(result.messages).toBeUndefined();
    });

    it('should deserialize undefined to entity collection when use default value is enabled', () =>
    {
        TypeManager.applyTypeOptionsBase({
            useDefaultValue: true
        });

        const user = { name: 'Dmitry', messages: undefined };
        const result = TypeManager.deserialize(User, user);
        
        expect(result.messages).toBeInstanceOf(EntityCollection);
    });

    it('should serialize entity collection to array', () =>
    {
        const user = new User('Dmitry', new EntityCollection());
        const result = TypeManager.serialize(User, user);
        
        expect(result.messages).toBeInstanceOf(Array);
    });

    it('should deserialize array to entity collection', () =>
    {
        const user = { name: 'Dmitry', messages: [] };
        const result = TypeManager.deserialize(User, user);
        
        expect(result.messages).toBeInstanceOf(EntityCollection);
    });
});
