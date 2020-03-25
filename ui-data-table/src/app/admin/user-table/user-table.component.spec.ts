import { MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatSortHarness } from '@angular/material/sort/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { TestUtils, ICompiledComponent } from 'src/app/shared/utils/tests/test-utils';
import { preventTestBedResetForComponentCompilation } from 'src/app/shared/utils/tests/test.common';
import { UserTableComponent } from './user-table.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { getUsers, getUsersUiState } from '../store/user.reducer';
import { User } from 'src/app/shared/models/user.model';

import * as userActions from '../store/user.actions';
import { DataTableQuery } from 'src/app/shared/models/data-table-query.model';

describe('User Table Component', () => {
  let compiled: ICompiledComponent<UserTableComponent>;
  let mockStore$: MockStore<any>;
  let mockGetUsers: MemoizedSelector<any, any>;
  let mockGetUsersUiState: MemoizedSelector<any, any>;
  let tableConfig: DataTableQuery;
  let loader: HarnessLoader;
  let table: MatTableHarness;
  let paginator: MatPaginatorHarness;
  let sortHeaders: MatSortHarness;

  const initialState = {
    userCount: 1,
    loading: false,
    errorMessage: null
  };
  const user: User = {
    _id: '1234',
    email: 'test@test.com.au',
    firstName: 'test',
    surname: 'user',
    role: 'tester'
  };

  preventTestBedResetForComponentCompilation(() => {
    TestUtils.configureComponentWithStoreTestingModule({
      declarations: [UserTableComponent],
      imports: [SharedModule, BrowserAnimationsModule]
    });
  });

  beforeEach(() => {
    compiled = TestUtils.createComponent(UserTableComponent);
    mockStore$ = TestBed.inject(MockStore);

    mockGetUsers = mockStore$.overrideSelector(getUsers, undefined);
    mockGetUsersUiState = mockStore$.overrideSelector(getUsersUiState, undefined);

    mockGetUsers.setResult(user);
    mockGetUsersUiState.setResult({ loading: false, errorMessage: null, userCount: 1 });

    loader = TestbedHarnessEnvironment.loader(compiled.fixture);

    spyOn(mockStore$, 'dispatch');
  });

  // selector, dispatch mock implementations
  describe('When creating the component', () => {
    beforeEach(() => {
      tableConfig = new DataTableQuery({
        filter: '',
        sortColumn: 'email',
        sortDirection: 'asc',
        pageIndex: '1',
        pageSize: '10'
      });
    });

    it('should render the component', () => {
      expect(compiled.instance).toBeTruthy();
    });

    it('It should dispatch the getUsers action', async () => {
      compiled.fixture.detectChanges();

      await compiled.fixture.whenStable();

      expect(mockStore$.dispatch).toHaveBeenCalledWith(userActions.getUsers(tableConfig));
    });
  });

  describe('on sorting', () => {
    beforeEach(async () => {
      spyOn(compiled.instance, 'fetchUsers');
      table = await loader.getHarness<MatTableHarness>(MatTableHarness);
      sortHeaders = await loader.getHarness<MatSortHarness>(MatSortHarness);
    });

    it('should sort asc on click', async () => {
      let headers = await sortHeaders.getSortHeaders({ sortDirection: '' });

      expect(headers.length).toBe(4);

      await headers[0].click();

      headers = await sortHeaders.getSortHeaders({ sortDirection: 'asc' });

      expect(headers.length).toBe(1);
    });

    it('should call fetch users function', async () => {
      const headers = await sortHeaders.getSortHeaders({ sortDirection: '' });

      await headers[0].click();

      expect(compiled.instance.fetchUsers).toHaveBeenCalled();
    });
  });

  describe('on filtering', () => {
    beforeEach(async () => {
      spyOn(compiled.instance, 'fetchUsers');
      table = await loader.getHarness<MatTableHarness>(MatTableHarness);
      paginator = await loader.getHarness<MatPaginatorHarness>(MatPaginatorHarness);
    });

    it('should default to pageSize of 10', async () => {
      const pageSize = await paginator.getPageSize();

      expect(pageSize).toEqual(10);
    });

    it('should call the fetch users function', async () => {
      const users = [];
      let i = 0;

      while (i < 20) {
        users.push(user);
        i++;
      }
      mockGetUsers.setResult(users);

      mockGetUsersUiState.setResult({ loading: false, errorMessage: null, userCount: 20 });

      compiled.instance.paginator.length = 20;

      await compiled.instance.paginator.nextPage();

      expect(compiled.instance.fetchUsers).toHaveBeenCalled();

    });
  });
});
