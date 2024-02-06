import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './musicSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    music: musicReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

sagaMiddleware.run(rootSaga);

export default store;
