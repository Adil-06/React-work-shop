import React from 'react';
//import AntDesignForm from './Components/AntDesignForm';
//import UserSignUp from './Components/Ant-design-Component/UserSignUp';
//import AllUserList from './Components/Ant-design-Component/AllUserList';
//import PageList from './Components/Ant-design-Component/PageList';
import AddNewUser from './Components/FormikComponent/AddNewUser';
import UserList from './Components/reduxComponent/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <AddNewUser/>
      <UserList/> 
      {/* <PageList />   */}
      {/* <UserSignUp />
      <AllUserList/> */} 
    </div>
  );
}

export default App;
