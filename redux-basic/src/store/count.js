import {createSlice} from '@reduxjs/toolkit';

const initialCountState = { counter: 0 , showCount : true}

const counterSlice = createSlice({
    name: 'Counter',
    initialState : initialCountState,
    reducers : {
        increment(state) {
            state.counter = state.counter + 1;
        },
        decrement(state) {
          state.counter = state.counter - 1;
        },
        increase(state, action) {
          state.counter = state.counter + action.payload;
        },
        toggle(state) {
          state.showCount = !state.showCount;
        },
        resetCount(state) {
          state.counter = 0;
        }
    }
});
export  const counterActions = counterSlice.actions;

export default counterSlice.reducer;