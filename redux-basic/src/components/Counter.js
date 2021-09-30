import { useSelector , useDispatch} from 'react-redux';
import {counterActions} from '../store/count'

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter.counter);
  const showCount = useSelector(state => state.counter.showCount)
  const dispatch = useDispatch();


  const toggleCounterHandler = () => {
   // dispatch({type : 'toggle'});
    dispatch(counterActions.toggle())
  }
  const onIncrement = () => {
   dispatch(counterActions.increment());
    // dispatch( {type : 'increment'})
  }
  const onDecrement = () => {
    dispatch(counterActions.decrement());
    //dispatch( {type : 'decrement'})
  }
  const onIncreaseBy = () => {
    dispatch(counterActions.increase(5));
    //dispatch({ type : "increase" , amount : 5})
  }
  const resetCount = () => {
    dispatch(counterActions.resetCount());
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
       {showCount && <div className={classes.value}>{counter}</div> }
      <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onIncreaseBy}>IncreaseBy5</button>
        <button onClick={onDecrement}>Decrement</button>
        <button onClick={resetCount}>Reset</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
