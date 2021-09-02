import React from 'react';
import SignUpForm from './Components/SignUpForm';
import AllSignUpUser from './Components/AllSignUpUser';
import AntDesignForm from './Components/AntDesignForm';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <SignUpForm/> <br/>
      <AllSignUpUser/>
      {/* <hr/>
      <AntDesignForm/> */}
      
    </div>
  );
}

export default App;
