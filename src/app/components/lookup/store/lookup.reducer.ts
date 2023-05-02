import * as LookupActions from './lookup.actions'
import { Lookup } from '../../../models/lookup';

export interface State {
  data: Lookup[];
}

const initialState: State = {
  data: [],
};

export function lookupReducer(
  state = initialState,
  action: LookupActions.AddData
) {
  switch (action.type) {
    case LookupActions.ADD_DATA:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
}
