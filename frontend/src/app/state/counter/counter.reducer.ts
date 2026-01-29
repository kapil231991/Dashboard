import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.action';

export const counterFeatureKey = 'counter';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, state => state + 1),
  on(CounterActions.decrement, state => state - 1),
  on(CounterActions.reset, () => 0)
);
