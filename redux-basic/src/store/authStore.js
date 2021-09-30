import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    isAuthenticated : false,
    userEmail: ['abc@mail.com']
  }
  
  const authSlice = createSlice({
    name : 'authentication',
    initialState : initialAuthState,
    reducers:{
      login(state, action) {
        state.isAuthenticated = true;
        state.userEmail = state.userEmail.concat( action.payload)
        console.log('paylod',action.payload)
      },
      logout(state) {
        state.isAuthenticated = false;
      },
    }
  });

export const authActions = authSlice.actions;

export default authSlice.reducer;