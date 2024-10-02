import { createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { Coordinator } from '../classes/coordinator';
import { AppState } from './models';

export const goBack = createAction('[Coordinator] Go Back');
export const goForward = createAction('[Coordinator] Go Forward');
export const addNew = createAction('[Coordinator] Add New', props<{ newCoordinator: any }>());

export const selectAppState = createFeatureSelector<AppState>('appState');
export const selectCurrentCoordinator = createSelector(selectAppState, (state) => state.currentValues);
export const selectPastStates = createSelector(selectAppState, (state) => state.past);
export const selectFutureStates = createSelector(selectAppState, (state) => state.future);
