import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';

import { TestUtils } from '../../shared/utils/tests/test-utils';
import { getUsers, getUsersSuccess, getUsersError } from './user.actions';
import { UserService } from '../../shared/services/user.service';
import { UserEffects } from './user.effects';
import { User } from '../../shared/models/user.model';
import { DataTableQuery } from 'src/app/shared/models/data-table-query.model';

describe('User Effects', () => {
  let userService: UserService;
  let userEffects: UserEffects;
  let store$: Store<any>;

  beforeEach(() => {
    TestUtils.configureEffectTestingModule({
      imports: [EffectsModule.forRoot([UserEffects])],
      providers: [UserEffects, UserService]
    });
  });

  beforeEach(() => {
    userEffects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService);
    store$ = TestBed.inject(Store);
  });

  describe('Get Users', () => {
    let getUsersSubject$: Subject<{
      users: Array<User>;
      userCount: number;
    }>;
    let event: (action: Action) => void;
    let subscription: Subscription;
    let action: any;
    const user: User = {
      _id: '1234',
      email: 'test@test.com.au',
      firstName: 'Test',
      surname: 'User',
      role: 'Tester'
    };

    beforeEach(() => {
      getUsersSubject$ = new Subject();
      spyOn(userService, 'getUsers').and.returnValue(getUsersSubject$);
      event = jasmine.createSpy('event');
      subscription = userEffects.getUsers$.subscribe(event);
      const dataTableQuery = new DataTableQuery({
        filter: '',
        sortColumn: 'email',
        sortDirection: 'asc',
        pageIndex: '1',
        pageSize: '10'
      });
      action = getUsers(dataTableQuery);
      store$.dispatch(action);
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('should call the user service', () => {
      // tslint:disable-next-line: no-unbound-method
      expect(userService.getUsers).toHaveBeenCalled();
    });

    it('should emit a getUsersSuccess action', () => {
      const response = {
        users: [user],
        userCount: 1
      };
      getUsersSubject$.next(response);

      expect(event).toHaveBeenCalledWith(
        getUsersSuccess({
          users: [user],
          userCount: 1
        })
      );
    });

    it('should emit a getUsersError action', () => {
      const errorMessage = 'unable to retrieve users';
      const error = new Error(errorMessage);
      getUsersSubject$.error(error);
      expect(event).toHaveBeenCalledWith(getUsersError({ errorMessage }));
    });
  });
});
