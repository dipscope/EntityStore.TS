import { UpdateCommandBuilder } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Update command builder', () =>
{
    it('should build update command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const user = new User('Dmitry');
        const updateCommandBuilder = new UpdateCommandBuilder(userSet, user);
        const updateCommand = updateCommandBuilder.build();

        expect(updateCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(updateCommand.entity).toBe(user);
    });

    it('should attach entity', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const updateCommandBuilder = new UpdateCommandBuilder(userSet, userX);
        const userY = new User('Alex');
        const updateCommand = updateCommandBuilder.attach(userY).build();

        expect(updateCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(updateCommand.entity).toBe(userY);
    });
});
