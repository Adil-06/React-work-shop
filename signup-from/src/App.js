import React from 'react';
//import SignUpForm from './Components/SignUpForm';
//import AllSignUpUser from './Components/AllSignUpUser';
//import AntDesignForm from './Components/AntDesignForm';
import UserSignUp from './Components/Ant-design-Component/UserSignUp';
import AllUserList from './Components/Ant-design-Component/AllUserList';
import './App.css';

function App() {
  return (
    <React.StrictMode>
    <div className="App">
      <UserSignUp/>
      <AllUserList/>
      <br/>      
      {/* <SignUpForm/>  */}
      {/* <AllSignUpUser/>      */}
    </div>
    </React.StrictMode>
  );
}

export default App;
