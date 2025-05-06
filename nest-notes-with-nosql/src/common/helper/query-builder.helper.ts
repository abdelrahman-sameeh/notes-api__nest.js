


export class QueryBuilder {
  private filter = {}
  private sort = {}
  private skip = 0;
  private limit = 10;

  constructor(private query: any) { }

  searchable(keyword: string = 'search') {
    if (this.query[keyword]) {
      this.filter[keyword] = { $regex: this.query[keyword], $options: 'i' };
    }
    return this
  }

  filterable() {
    const exclude = ['page', 'limit', 'search', 'sortBy', 'orderBy']
    Object.keys(this.query).forEach(key => {
      if (!exclude.includes(key) && !this.filter[key]) {
        this.filter[key] = this.query[key]
      }
    })
    return this
  }

  sortable(defaultField = 'createdAt') {
    const sortBy = this.query.sortBy || defaultField;
    const order = this.query.orderBy == 'asc' ? 1 : -1;
    this.sort = { [sortBy]: order }
    return this
  }

  paginate(defaultPage = 1, defaultLimit = 10) {
    const page = parseInt(this.query.page, 10) || defaultPage
    const limit = parseInt(this.query.limit, 10) || defaultLimit
    this.skip = (page - 1) * limit
    this.limit = limit
    return this
  }

  build() {
    return {
      filter: this.filter,
      sort: this.sort,
      skip: this.skip,
      limit: this.limit,
    }
  }

}
