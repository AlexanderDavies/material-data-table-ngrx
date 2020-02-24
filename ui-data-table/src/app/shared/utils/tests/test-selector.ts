/*ignore file coverage*/

import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

import { IRouterStateUrl } from '../app/redux/router/router.reducer';

import { TestUtils } from './test-utils';

// tslint:disable-next-line: only-arrow-functions
export function createSelectorState(states: { [keyState: string]: any }, params?: Params): any {
  return {
    ...states,
    ...(!params
      ? {}
      : {
          router: {
            ...TestUtils.createSpyObjWithoutMethods<RouterReducerState<IRouterStateUrl>>(
              'routerState'
            ),
            state: { params }
          }
        })
  };
}
