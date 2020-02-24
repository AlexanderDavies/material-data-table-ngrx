import { createAction, union } from '@ngrx/store';

import { DataTableQuery } from '../../shared/models/data-table-query.model';
import { User } from '../../shared/models/user.model';

export const getUsers = createAction('[User] Get Users', (payload: DataTableQuery) => ({
  dataTableQuery: { ...payload }
}));

export const getUsersSuccess = createAction(
  '[User] Get Users Success',
  (payload: { users: Array<User>; userCount: number }) => ({ ...payload })
);

export const getUsersError = createAction(
  '[User] Get Users Error',
  (payload: { errorMessage: string }) => ({ ...payload })
);

const userActions = union({
  getUsers,
  getUsersSuccess,
  getUsersError
});

export type UserActions = typeof userActions;
