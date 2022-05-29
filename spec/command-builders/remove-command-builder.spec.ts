import { RemoveCommandBuilder } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Remove command builder', () =>
{
    it('should build remove command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const user = new User('Dmitry');
        const removeCommandBuilder = new RemoveCommandBuilder(userSet, user);
        const removeCommand = removeCommandBuilder.build();

        expect(removeCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(removeCommand.entity).toBe(user);
    });

    it('should attach entity', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const removeCommandBuilder = new RemoveCommandBuilder(userSet, userX);
        const userY = new User('Alex');
        const removeCommand = removeCommandBuilder.attach(userY).build();

        expect(removeCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(removeCommand.entity).toBe(userY);
    });
});
