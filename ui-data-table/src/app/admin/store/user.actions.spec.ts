import { getUsers, getUsersError, getUsersSuccess } from './user.actions';
import { DataTableQuery } from 'src/app/shared/models/data-table-query.model';
import { User } from '../../shared/models/user.model';

describe('User Actions', () => {
  describe('Get Users', () => {
    let args: any;
    let payload: DataTableQuery;
    beforeEach(() => {
      args = {
        filter: '',
        sortColumn: 'email',
        sortDirection: 'asc',
        pageIndex: '1',
        pageSize: '10'
      };
      payload = new DataTableQuery({ ...args });
    });

    it('Should return the get users action', () => {
      const result = getUsers(payload);

      expect(result).toEqual({
        type: '[User] Get Users',
        dataTableQuery: { ...payload }
      });
    });
  });

  describe('Get Users Success', () => {
    let payload: { users: Array<User>; userCount: number };
    const user: User = {
      _id: '1234',
      email: 'test@tester.com.au',
      firstName: 'test',
      surname: 'users',
      role: 'tester'
    };
    beforeEach(() => {
      payload = { users: [user], userCount: 10 };
    });

    it('Should return the get users success action', () => {
      const result = getUsersSuccess(payload);

      expect(result).toEqual({
        type: '[User] Get Users Success',
        users: [user],
        userCount: 10
      });
    });
  });

  describe('Get Users Error', () => {
    let payload: {errorMessage: string};

    beforeEach(() => {
      payload = {errorMessage: 'unable to get users'}
    });

    it('Should return the get users error action', () => {
      const result = getUsersError(payload);

      expect(result).toEqual({
        type: '[User] Get Users Error',
        errorMessage: 'unable to get users'
      });
    });
  });
});
