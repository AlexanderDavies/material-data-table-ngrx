import { ActionReducerMap } from '@ngrx/store';

interface AppState {}

// only combine first reducer as additional reducers are lazy loaded
export const reducers: ActionReducerMap<AppState> = {};
