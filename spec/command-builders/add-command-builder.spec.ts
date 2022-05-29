import { AddCommandBuilder } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Add command builder', () =>
{
    it('should build add command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const user = new User('Dmitry');
        const addCommandBuilder = new AddCommandBuilder(userSet, user);
        const addCommand = addCommandBuilder.build();

        expect(addCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(addCommand.entity).toBe(user);
    });

    it('should attach entity', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const addCommandBuilder = new AddCommandBuilder(userSet, userX);
        const userY = new User('Alex');
        const addCommand = addCommandBuilder.attach(userY).build();

        expect(addCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(addCommand.entity).toBe(userY);
    });
});
