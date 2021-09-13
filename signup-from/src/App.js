import React from 'react';
//import SignUpForm from './Components/SignUpForm';
//import AllSignUpUser from './Components/AllSignUpUser';
//import AntDesignForm from './Components/AntDesignForm';
import UserSignUp from './Components/Ant-design-Component/UserSignUp';
import AllUserList from './Components/Ant-design-Component/AllUserList';
//import UserPagination from './Components/Ant-design-Component/UserPagination';
//import AntPagination from './Components/Ant-design-Component/AntPagination';
import './App.css';

function App() {
  return (
  
    <div className="App">
      {/* <AntPagination/> */}
    {/* <UserPagination/> */}
      <UserSignUp/>
      <AllUserList/>
      <br/>  

      {/* <SignUpForm/>  */}
      {/* <AllSignUpUser/>      */}
    </div>
   
  );
}

export default App;
