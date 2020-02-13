export class DataTableQuery {
  public filter: string;
  public sortColumn: string;
  public sortDirection: string;
  public pageIndex: string;
  public pageSize: string;

  constructor({filter = '', sortColumn = 'email', sortDirection = 'asc', pageIndex = '1', pageSize = '10'}) {
    this.filter = filter;
    this.sortColumn = sortColumn;
    this.sortDirection = sortDirection;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}
