import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LookupActions from './lookup.actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lookup } from 'src/app/models/lookup';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AchievementsEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LookupActions.GET_DATA),
      exhaustMap(() => {
        return this.http
          .get<Lookup[]>('https://jsonplaceholder.typicode.com/photos')
          .pipe(
            map((data) => {
              return new LookupActions.AddData(data);
            }),
            catchError((error) => {
              return of();
            })
          );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
