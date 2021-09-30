import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './count';
import authReducer from './authStore'
 

//const store = createStore(createSlice.reducers)

const store = configureStore({
  reducer: { counter: counterReducer , auth : authReducer}
});

export default store;