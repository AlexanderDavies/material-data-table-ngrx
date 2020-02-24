import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, fromEvent, Subscription, merge } from 'rxjs';

import { getUsers, getUsersUiState } from '../store/user.reducer';
import * as userActions from '../store/user.actions';
import { User } from '../../shared/models/user.model';
import { DataTableQuery } from 'src/app/shared/models/data-table-query.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['email', 'firstName', 'surname', 'role'];
  defaultPageSize = 10;
  users$: Observable<Array<User>> = this.store.pipe(select(getUsers));
  usersUiState$: Observable<{
    loading: boolean;
    userCount: number;
    errorMessage: string;
  }> = this.store.pipe(select(getUsersUiState));
  sortSub: Subscription;
  watchChangesSub: Subscription;
  onLoadQuery = new DataTableQuery({
    filter: '',
    sortColumn: 'email',
    sortDirection: 'asc',
    pageIndex: '1',
    pageSize: this.defaultPageSize.toString()
  });

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(userActions.getUsers(this.onLoadQuery));
  }

  ngAfterViewInit() {
    // fetch users on search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.fetchUsers();
        })
      )
      .subscribe();

    // reset pageIndex on sort
    this.sortSub = this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    // on sort or pagination then fetch users
    this.watchChangesSub = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.fetchUsers();
        })
      )
      .subscribe();
  }

  // dispatch action to fetch users
  fetchUsers() {
    const tableConfig = new DataTableQuery({
      filter: this.input.nativeElement.value,
      sortColumn: this.sort.active,
      sortDirection: this.sort.direction,
      pageIndex: (this.paginator.pageIndex + 1).toString(),
      pageSize: this.paginator.pageSize.toString()
    });
    this.store.dispatch(userActions.getUsers(tableConfig));
  }

  ngOnDestroy() {
    if (this.sortSub) {
      this.sortSub.unsubscribe();
    }

    if (this.watchChangesSub) {
      this.watchChangesSub.unsubscribe();
    }
  }
}
