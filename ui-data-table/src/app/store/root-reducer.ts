import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './root-state';

// only combine first reducer as additional reducers are lazy loaded
export const reducers: ActionReducerMap<AppState> = {
}
