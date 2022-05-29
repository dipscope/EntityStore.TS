import { SaveCommandBuilder } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Save command builder', () =>
{
    it('should build save command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const user = new User('Dmitry');
        const saveCommandBuilder = new SaveCommandBuilder(userSet, user);
        const saveCommand = saveCommandBuilder.build();

        expect(saveCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(saveCommand.entity).toBe(user);
    });

    it('should attach entity', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const saveCommandBuilder = new SaveCommandBuilder(userSet, userX);
        const userY = new User('Alex');
        const saveCommand = saveCommandBuilder.attach(userY).build();

        expect(saveCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(saveCommand.entity).toBe(userY);
    });
});
