export interface AppState {
  variable: {
    past: string[];
    present: string;
    future: string[];
  };
}

export const initialState: AppState['variable'] = {
  past: [],
  present: '',
  future: [],
};
