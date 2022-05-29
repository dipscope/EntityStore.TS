import { BulkSaveCommandBuilder, EntityCollection } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Bulk save command builder', () =>
{
    it('should build bulk save command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection<User>([userX, userY]);
        const bulkSaveCommandBuilder = new BulkSaveCommandBuilder(userSet, entityCollection);
        const bulkSaveCommand = bulkSaveCommandBuilder.build();

        expect(bulkSaveCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkSaveCommand.entityCollection).toBe(entityCollection);
        expect(bulkSaveCommand.entityCollection.at(0)).toBe(userX);
        expect(bulkSaveCommand.entityCollection.at(1)).toBe(userY);
    });

    it('should attach entity collection', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollectionX = new EntityCollection<User>([userX, userY]);
        const bulkSaveCommandBuilder = new BulkSaveCommandBuilder(userSet, entityCollectionX);
        const entityCollectionY = new EntityCollection<User>([userY, userX]);
        const bulkSaveCommand = bulkSaveCommandBuilder.attach(entityCollectionY).build();

        expect(bulkSaveCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkSaveCommand.entityCollection).toBe(entityCollectionY);
        expect(bulkSaveCommand.entityCollection.at(0)).toBe(userY);
        expect(bulkSaveCommand.entityCollection.at(1)).toBe(userX);
    });
});
