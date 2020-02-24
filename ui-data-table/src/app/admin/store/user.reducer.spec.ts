import { Action } from '@ngrx/store';

import { userReducer, getUsers, getUsersUiState} from './user.reducer';
import * as actions from './user.actions';
import { createEntityState } from 'src/app/shared/utils/tests/test-reducer';
import { User } from 'src/app/shared/models/user.model';
import { DataTableQuery } from 'src/app/shared/models/data-table-query.model';

describe('User Reducer', () => {
  const userEntityState = createEntityState<User>([], '12345');
  const user: User = {
    _id: '1234',
    email: 'test@test.com.au',
    firstName: 'test',
    surname: 'user',
    role: 'tester'
  };

  describe('on getUsersAction', () => {
    it('should set loading to true when reducing get users action', () => {
      const state = {
        ...userEntityState,
        userCount: null,
        loading: false,
        errorMessage: null
      };
      const payload = new DataTableQuery({});

      const result = userReducer(state, actions.getUsers(payload));

      expect(result).toEqual(
        jasmine.objectContaining({
          entities: {},
          ids: [],
          userCount: null,
          loading: true,
          errorMessage: null
        })
      );
    });

    it('should set error to null when reducing get users action', () => {
      const state = {
        ...userEntityState,
        userCount: null,
        loading: false,
        errorMessage: 'this is an error'
      };
      const payload = new DataTableQuery({});

      const result = userReducer(state, actions.getUsers(payload));

      expect(result).toEqual(
        jasmine.objectContaining({
          entities: {},
          ids: [],
          userCount: null,
          loading: true,
          errorMessage: null
        })
      );
    });
  });

  it('should set users entities and loading to false when reducing get users success action', () => {
    const state = {
      ...userEntityState,
      userCount: null,
      loading: true,
      errorMessage: null
    };

    const result = userReducer(state, actions.getUsersSuccess({users: [user], userCount: 1}));

    expect(result).toEqual(
      jasmine.objectContaining({
        entities: {1234: user},
        ids: ['1234'],
        userCount: 1,
        loading: false,
        errorMessage: null
      })
    );
  });


  it('should set loading to false and error message when reducing get Users Error', () => {
    const state = {
      ...userEntityState,
      userCount: null,
      loading: false,
      errorMessage: null
    };

    const result = userReducer(state, actions.getUsersError({ errorMessage: 'unable to get users' }));

    expect(result).toEqual(
      jasmine.objectContaining({
        entities: {},
        ids: [],
        userCount: null,
        loading: false,
        errorMessage: 'unable to get users'
      })
    );
  });

  describe('User Selectors', () => {
    describe('Get Users', () => {
      it('should return the users', () => {
        const state = {
          entities: {1234: user},
          ids: ['1234'],
          userCount: 1,
          loading: false,
          errorMessage: null
        };
        const result = getUsers.projector(state);
        expect(result).toEqual([user]);
      });
    });

    describe('Get Users UI State', () => {
      it('should return the ui state', () => {
        const state = {
          entities: {1234: user},
          ids: ['1234'],
          userCount: 1,
          loading: true,
          errorMessage: null
        };
        const result = getUsersUiState.projector(state);
        expect(result).toEqual(jasmine.objectContaining({loading: true, errorMessage: null, userCount: 1}));
      });
    });
  });
});
