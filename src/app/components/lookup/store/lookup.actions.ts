import { Action } from '@ngrx/store';
import { Lookup } from 'src/app/models/lookup';

export const GET_DATA = 'GET_DATA';
export const ADD_DATA = 'ADD_DATA';

export class GetData implements Action {
  readonly type = GET_DATA;
}

export class AddData implements Action {
  readonly type = ADD_DATA;

  constructor(public payload: Lookup[]) {}
}
