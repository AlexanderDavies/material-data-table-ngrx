import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { getUsers, getUsersSuccess, getUsersError } from './user.actions';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UserEffects {
  constructor(private readonly actions$: Actions, private readonly userService: UserService) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(action =>
        this.userService.getUsers(action.dataTableQuery).pipe(
          map(res => getUsersSuccess(res)),
          catchError(err => {
            return of(getUsersError({ errorMessage: err.message }));
          })
        )
      )
    )
  );
}
