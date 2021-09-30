import {createStore} from 'redux';

const initialState = { counter: 0 , showCount : true}

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            showCount: state.showCount
        }
    }
    if(action.type ==='increase') {
        return {
            counter: state.counter + action.amount,
            showCount: state.showCount
        }
    }
    if(action.type === 'decrement') {
        return {
            counter : state.counter - 1,
            showCount: state.showCount
        }
    }
    if(action.type ==='toggle') {
        return {
            showCount: !state.showCount,
            counter: state.counter
        }
    }
    return state ;
}

const store = createStore(counterReducer);

export default store;