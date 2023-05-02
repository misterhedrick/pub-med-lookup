import { ActionReducerMap } from '@ngrx/store';
import * as fromLookup from '../components/lookup/store/lookup.reducer';

export interface AppState {
  data: fromLookup.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  data: fromLookup.lookupReducer
};
