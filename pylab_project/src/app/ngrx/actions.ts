import { createAction, props } from '@ngrx/store';

export const updateVariable = createAction(
  '[Variable] Update Variable',
  props<{ variable: string }>()
);

export const undoAction = createAction('[Variable] Undo');
export const redoAction = createAction('[Variable] Redo');
