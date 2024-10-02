import { createReducer, on } from '@ngrx/store';
import { AppState } from './models';
import { addNew, goBack, goForward } from './actions';

const initialState: AppState = {
  past: [],
  currentValues: {},
  future: [],
};

export const coordinatorReducer = createReducer(
  initialState,
  on(goBack, (state) => {
    const previousState = state.past[state.past.length - 1];
    if (!previousState) return state;

    return {
      ...state,
      past: state.past.slice(0, -1), // Elimina el último estado del pasado
      currentValues: { ...previousState }, // El estado anterior se convierte en el actual
      future: [state.currentValues, ...state.future], // El estado actual pasa al futuro
    };
  }),
  on(goForward, (state) => {
    const nextState = state.future[0]; // El siguiente estado futuro
    console.log('nextState', nextState);
    let result = {
      ...state,
      past: [...state.past, { ...state.currentValues }], // Mueve el estado actual al pasado
      currentValues: { ...nextState }, // El siguiente estado futuro se convierte en el actual
      future: state.future.slice(1), // Elimina ese futuro del array
    };
    console.log(result);

    return result;
  }),
  on(addNew, (state, { newCoordinator} ) => {
    let result = {
      ...state,
      past: [...state.past, { ...state.currentValues }], // Mueve el estado actual al pasado
      currentValues: { ...newCoordinator }, // Establece el nuevo estado como actual
      future: [], // No hay futuros cuando agregas un nuevo estado
    };

    return result;
  })
);
