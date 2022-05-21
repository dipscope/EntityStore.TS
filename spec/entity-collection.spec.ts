import { EntityCollection } from '../src';
import { User } from './entity-store.spec';

describe('Entity collection', () =>
{
    it('should count entities', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);

        expect(entityCollection.length).toBe(2);
    });

    it('should shift entity', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);
        const entity = entityCollection.shift();

        expect(entityCollection.length).toBe(1);
        expect(entity).toBe(userX);
    });

    it('should pop entity', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);
        const entity = entityCollection.pop();

        expect(entityCollection.length).toBe(1);
        expect(entity).toBe(userY);
    });

    it('should push entities', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX]);

        entityCollection.push(userY);

        expect(entityCollection.length).toBe(2);
        expect(entityCollection.at(1)).toBe(userY);
    });

    it('should unshift entities', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX]);

        entityCollection.unshift(userY);

        expect(entityCollection.length).toBe(2);
        expect(entityCollection.at(0)).toBe(userY);
    });

    it('should concat entity collections', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollectionX = new EntityCollection([userX, userY]);
        const entityCollectionY = new EntityCollection([userY, userX]);
        const entityCollectionZ = entityCollectionX.concat(entityCollectionY);

        expect(entityCollectionZ.length).toBe(4);
        expect(entityCollectionZ.at(0)).toBe(userX);
        expect(entityCollectionZ.at(1)).toBe(userY);
        expect(entityCollectionZ.at(2)).toBe(userY);
        expect(entityCollectionZ.at(3)).toBe(userX);
    });

    it('should slice entity collection', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollectionX = new EntityCollection([userX, userY, userX, userY]);
        const entityCollectionY = entityCollectionX.slice(0,2);

        expect(entityCollectionY.length).toBe(2);
        expect(entityCollectionY.at(0)).toBe(userX);
        expect(entityCollectionY.at(1)).toBe(userY);
    });

    it('should reverse entity collection', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);
        
        entityCollection.reverse();

        expect(entityCollection.length).toBe(2);
        expect(entityCollection.at(0)).toBe(userY);
        expect(entityCollection.at(1)).toBe(userX);
    });

    it('should sort entity collection', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);
        
        entityCollection.sort((x, y) => x.name.length > y.name.length ? 1 : -1);

        expect(entityCollection.length).toBe(2);
        expect(entityCollection.at(0)).toBe(userY);
        expect(entityCollection.at(1)).toBe(userX);
    });

    it('should get index of entity', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);
        const index = entityCollection.indexOf(userY);

        expect(index).toBe(1);
    });
    
    it('should check if every entity match a condition', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);
        const result = entityCollection.every(u => u.name.startsWith('A'));
        
        expect(result).toBeFalse();
    });

    it('should check if some entity match a condition', () =>
    {
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection([userX, userY]);
        const result = entityCollection.some(u => u.name.startsWith('A'));
        
        expect(result).toBeTrue();
    });
});
