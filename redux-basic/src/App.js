import Counter from './components/Counter';
import Header from './components/Header';
import Login from './components/Auth';
import UserProfile from './components/UserProfile'
import LoginForm from './components/LoginForm';
import {useSelector} from 'react-redux'


function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  //console.log("auth", isAuth)
  return (
    <>
    <Header/>
     {/* {!isAuth && <Login/> } */}
     {!isAuth && < LoginForm/> }
     {isAuth && <UserProfile/>}

    <Counter />
    </>
  );
}

export default App;
