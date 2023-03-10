import { configureStore } from '@reduxjs/toolkit';

import { mycontactsApi } from './contactRTKSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    [mycontactsApi.reducerPath]: mycontactsApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    mycontactsApi.middleware,
  ],
});
