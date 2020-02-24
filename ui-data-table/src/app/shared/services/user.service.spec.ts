import { UserService } from './user.service';
import { preventTestBedResetForComponentCompilation } from '../utils/tests/test.common';
import { TestUtils } from '../utils/tests/test-utils';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataTableQuery } from '../models/data-table-query.model';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('User Service', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  const dataTableQuery = new DataTableQuery({
    filter: '',
    sortColumn: 'surname',
    sortDirection: 'asc',
    pageIndex: '1',
    pageSize: '1'
  });

  preventTestBedResetForComponentCompilation(() =>
    TestUtils.configureHttpServiceTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents()
  );

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when fetching users', () => {
    let returnData: {
      users: Array<User>;
      usersCount: number;
    };
    let errorResponse: HttpErrorResponse;

    beforeEach(() => {
      returnData = {
        users: [
          {
            _id: '1',
            email: 'test@test.com',
            firstName: 'test',
            surname: 'user',
            role: 'doctor'
          }
        ],
        usersCount: 1
      };
      errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found'
      });
    });

    it('should return an array of users and the total user count', done => {
      userService.getUsers(dataTableQuery).subscribe(body => {
        expect(body.users).toEqual(returnData.users);
        expect(body.usersCount).toEqual(1);
        done();
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/user?filter=&sortColumn=surname&sortDirection=asc&pageIndex=1&pageSize=1`
      );
      expect(req.request.method).toBe('GET');
      req.flush(returnData);
    });

    it('should throw an error if no users were found', done => {
      userService.getUsers(dataTableQuery).subscribe(
        body => fail('it should have thrown an error'),
        err => {
          expect(err.status).toEqual(404);
          done();
        }
      );

      const req = httpMock.expectOne(
        `${environment.apiUrl}/user?filter=&sortColumn=surname&sortDirection=asc&pageIndex=1&pageSize=1`
      );
      expect(req.request.method).toBe('GET');
      req.flush(null, errorResponse);
    });
  });
});
