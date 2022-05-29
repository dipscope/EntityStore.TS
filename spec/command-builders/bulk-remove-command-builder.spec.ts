import { BulkRemoveCommandBuilder, EntityCollection } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Bulk remove command builder', () =>
{
    it('should build bulk remove command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection<User>([userX, userY]);
        const bulkRemoveCommandBuilder = new BulkRemoveCommandBuilder(userSet, entityCollection);
        const bulkRemoveCommand = bulkRemoveCommandBuilder.build();

        expect(bulkRemoveCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkRemoveCommand.entityCollection).toBe(entityCollection);
        expect(bulkRemoveCommand.entityCollection.at(0)).toBe(userX);
        expect(bulkRemoveCommand.entityCollection.at(1)).toBe(userY);
    });

    it('should attach entity collection', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollectionX = new EntityCollection<User>([userX, userY]);
        const bulkRemoveCommandBuilder = new BulkRemoveCommandBuilder(userSet, entityCollectionX);
        const entityCollectionY = new EntityCollection<User>([userY, userX]);
        const bulkRemoveCommand = bulkRemoveCommandBuilder.attach(entityCollectionY).build();

        expect(bulkRemoveCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkRemoveCommand.entityCollection).toBe(entityCollectionY);
        expect(bulkRemoveCommand.entityCollection.at(0)).toBe(userY);
        expect(bulkRemoveCommand.entityCollection.at(1)).toBe(userX);
    });
});
