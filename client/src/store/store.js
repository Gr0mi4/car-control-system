import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk })
});
