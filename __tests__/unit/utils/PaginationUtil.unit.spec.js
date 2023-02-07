const PaginationUtil = require('../../../src/utils/PaginationUtil');

describe('PaginationUtil Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('constructor Method Success', async () => {
    const page = 1;
    const countAll = 1;
    const pageLimit = 1;
    const sectionLimit = 1;

    const totalPage = parseInt(countAll / pageLimit) + (countAll % pageLimit != 0 ? 1 : 0);
    let startPage = parseInt((page - 1) / sectionLimit) * sectionLimit;
    if (startPage % sectionLimit === 0) {
      startPage += 1;
    }
    let endPage = startPage + sectionLimit - 1;
    if (endPage > totalPage) {
      endPage = totalPage;
    }

    const paginationUtil = new PaginationUtil(page, countAll, pageLimit, sectionLimit);
    
    expect(paginationUtil.page).toEqual(page);
    expect(paginationUtil.totalPage).toEqual(totalPage);
    expect(paginationUtil.startPage).toEqual(startPage);
    expect(paginationUtil.endPage).toEqual(endPage);
  });

  test('constructor Method Success (2)', async () => {
    const page = 1;
    const countAll = 5;
    const pageLimit = 2;
    const sectionLimit = 2;

    const totalPage = parseInt(countAll / pageLimit) + (countAll % pageLimit != 0 ? 1 : 0);
    let startPage = parseInt((page - 1) / sectionLimit) * sectionLimit;
    if (startPage % sectionLimit === 0) {
      startPage += 1;
    }
    let endPage = startPage + sectionLimit - 1;
    if (endPage > totalPage) {
      endPage = totalPage;
    }

    const paginationUtil = new PaginationUtil(page, countAll, pageLimit, sectionLimit);
    
    expect(paginationUtil.page).toEqual(page);
    expect(paginationUtil.totalPage).toEqual(totalPage);
    expect(paginationUtil.startPage).toEqual(startPage);
    expect(paginationUtil.endPage).toEqual(endPage);
  });
});
