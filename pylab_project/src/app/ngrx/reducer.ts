import {
  Action,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on,
} from '@ngrx/store';
import { redoAction, undoAction, updateVariable } from './actions';
import { AppState, initialState } from './models';


const _variableReducer = createReducer(
  initialState,
  on(updateVariable, (state, { variable }) => ({
    ...state,
    past: [...state.past, state.present],
    present: variable,
    future: [],
  })),
  on(undoAction, (state) => {
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    return {
      ...state,
      past: newPast,
      present: previous,
      future: [state.present, ...state.future],
    };
  }),
  on(redoAction, (state) => {
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    return {
      ...state,
      past: [...state.past, state.present],
      present: next,
      future: newFuture,
    };
  })
);

export function variableReducer(
  state: AppState['variable'] | undefined,
  action: Action
) {
  return _variableReducer(state, action);
}

export const reducers: ActionReducerMap<AppState> = {
  variable: variableReducer, // Asegúrate de que tu estado tenga esta estructura
};

export const metaReducers: MetaReducer<AppState>[] = [];
