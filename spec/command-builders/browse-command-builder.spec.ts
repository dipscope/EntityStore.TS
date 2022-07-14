import { AscSortExpression, BrowseCommandBuilder, EqFilterExpression, OffsetPaginateExpression } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Browse command builder', () =>
{
    it('should build bulk query command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const browseCommandBuilder = new BrowseCommandBuilder(userSet);

        browseCommandBuilder.filter((u, f) => f.eq(u.name, 'Dmitry')).sortByAsc(u => u.name).paginate(p => p.offsetLimit(2, 10));

        const bulkQueryCommand = browseCommandBuilder.build();

        expect(bulkQueryCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkQueryCommand.filterExpression).toBeInstanceOf(EqFilterExpression);
        expect(bulkQueryCommand.sortExpression).toBeInstanceOf(AscSortExpression);
        expect(bulkQueryCommand.paginateExpression).toBeInstanceOf(OffsetPaginateExpression);
    });
});
