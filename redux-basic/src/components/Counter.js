import { useSelector , useDispatch} from 'react-redux'

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const showCount = useSelector(state => state.showCount)
  const dispatch = useDispatch();


  const toggleCounterHandler = () => {
    dispatch({type : 'toggle'});
    //console.log('hello  react redux')
  }
  const onIncrement = () => {
    dispatch( {type : 'increment'})
  }
  const onDecrement = () => {
    dispatch( {type : 'decrement'})
  }
  const onIncreaseBy = () => {
    dispatch({ type : "increase" , amount : 5})
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
       {showCount && <div className={classes.value}>{counter}</div> }
      <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onIncreaseBy}>IncreaseBy5</button>
        <button onClick={onDecrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
