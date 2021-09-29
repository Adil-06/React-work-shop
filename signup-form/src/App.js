import React from 'react';
//import AntDesignForm from './Components/AntDesignForm';
import UserSignUp from './Components/Ant-design-Component/UserSignUp';
import AllUserList from './Components/Ant-design-Component/AllUserList';
import PageList from './Components/Ant-design-Component/PageList';
import BasicForm from './Components/FormikComponent/BasicForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <BasicForm/>
      <PageList />     
      {/* <UserSignUp />
      <AllUserList/> */}
 
    </div>
  );
}

export default App;
