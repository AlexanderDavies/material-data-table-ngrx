import { createEntityAdapter } from '@ngrx/entity';
import { EntityState } from '@ngrx/entity';
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';

import {User} from '../../shared/models/user.model';
import * as userActions from './user.actions';

export interface UserState extends EntityState<User> {
  // additional property to store UI variables
  userCount: null;
  loading: false;
  errorMessage: null;
}

const userAdapter = createEntityAdapter<User>({
  selectId: user => user._id
});

const initialUserState: UserState = userAdapter.getInitialState({
  userCount: null,
  loading: false,
  errorMessage: null
});

export const userReducer = createReducer(
  initialUserState,
  on(userActions.getUsers, (state) => ({...state, loading: true, errorMessage: null})),
  on(userActions.getUsersSuccess, (state, {users, userCount}) => userAdapter.addAll(users, {
    ...state,
    userCount,
    loading: false,
    errorMessage: null
  })),
  on(userActions.getUsersError, (state, {errorMessage}) => ({...state, loading: false, errorMessage}))
  );

const {
  selectAll
} = userAdapter.getSelectors();

const selectUsersState = createFeatureSelector<UserState>('user');

export const getUsers = createSelector(
  selectUsersState,
  selectAll
);

export const getUsersUiState = createSelector(
  selectUsersState,
  (state: UserState) => ({userCount: state.userCount, loading: state.loading, errorMessage: state.errorMessage})
);
