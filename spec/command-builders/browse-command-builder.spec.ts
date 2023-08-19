import { AndFilterExpression, AscSortExpression, BrowseCommandBuilder, DescSortExpression } from '../../src';
import { EqFilterExpression, OffsetPaginateExpression, SizePaginateExpression } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Browse command builder', () =>
{
    it('should build bulk query command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const browseCommandBuilder = new BrowseCommandBuilder(userSet);

        browseCommandBuilder.filter((u, f) => f.eq(u.name, 'Dmitry'))
            .sortByAsc(u => u.name)
            .paginate(p => p.offsetLimit(2, 10));

        const bulkQueryCommand = browseCommandBuilder.build();

        expect(bulkQueryCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkQueryCommand.filterExpression).toBeInstanceOf(EqFilterExpression);
        expect(bulkQueryCommand.sortExpression).toBeInstanceOf(AscSortExpression);
        expect(bulkQueryCommand.paginateExpression).toBeInstanceOf(OffsetPaginateExpression);

        browseCommandBuilder.filter((u, f) => f.eq(u.name, undefined))
            .filter((u, f) => f.in(u.rank, [null, '1', undefined]))
            .sortByDesc(u => u.name)
            .paginate(p => p.pageSize(2, 10));

        const otherBulkQueryCommand = browseCommandBuilder.build();

        expect(otherBulkQueryCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(otherBulkQueryCommand.filterExpression).toBeInstanceOf(AndFilterExpression);
        expect(otherBulkQueryCommand.sortExpression).toBeInstanceOf(DescSortExpression);
        expect(otherBulkQueryCommand.paginateExpression).toBeInstanceOf(SizePaginateExpression);
    });
});
