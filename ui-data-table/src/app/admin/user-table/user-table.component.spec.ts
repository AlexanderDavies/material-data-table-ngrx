import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { TestUtils, ICompiledComponent } from 'src/app/shared/utils/tests/test-utils';
import { preventTestBedResetForComponentCompilation } from 'src/app/shared/utils/tests/test.common';
import { UserTableComponent } from './user-table.component';
import { TestBed } from '@angular/core/testing';
import {getUsers, getUsersUiState} from '../store/user.reducer';


describe('User Table Component', () => {
  let compiled: ICompiledComponent<UserTableComponent>;
  let mockStore: MockStore<any>;
  const initialState = {
    userCount: null,
    loading: false,
    errorMessage: null
  };

  preventTestBedResetForComponentCompilation(() => {
    TestUtils.configureComponentWithStoreTestingModule({
      declarations: [UserTableComponent],
      imports: [SharedModule]
    });
  });

  beforeEach(() => {
    compiled = TestUtils.createComponent(UserTableComponent);
    //current workaround for angular 9
    mockStore = (TestBed.inject(Store) as unknown) as MockStore<any>;
  });

  // selector, dispatch mock implementations
  describe('When creating the component', () => {
    let mockGetUsers: MemoizedSelector<any, any>;
    let mockGetUsersUiState: MemoizedSelector<any, any>;

    beforeEach(() => {
      mockGetUsers = mockStore.overrideSelector(getUsers, undefined);
      mockGetUsersUiState = mockStore.overrideSelector(getUsersUiState, undefined);
    });

    it('should render the component', () => {
      expect(compiled.instance).toBeTruthy();
    });


  });
});
