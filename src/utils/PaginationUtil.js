'use strict';

class PaginationUtil {
  constructor(page, countAll, pageLimit, sectionLimit) {
    this.page = page;
    this.totalPage = parseInt(countAll / pageLimit) + (countAll % pageLimit != 0 ? 1 : 0);

    this.startPage = parseInt((this.page - 1) / sectionLimit) * sectionLimit;
    if (this.startPage % sectionLimit === 0) {
      this.startPage += 1;
    }

    this.endPage = this.startPage + sectionLimit - 1;
    if (this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }
  }

  render() {
    return { page: this.page, totalPage: this.totalPage, startPage: this.startPage, endPage: this.endPage };
  }
}

module.exports = PaginationUtil;
