import React, { useState, useCallback } from 'react'
import { Button, Card } from 'antd';
import About from './About';
import 'antd/dist/antd.css'

const Home = () => {
  console.log('home page running')
  const [para, setPara] = useState(false);
  const [togglebtn, setToggleBtn] = useState(false)

  const toggleHandler = useCallback(() => {
    if (togglebtn) {
      setPara((prev => !prev));
    }
  }, [togglebtn])
  const ButtonHandler = () => { setToggleBtn(true); }

  return (
    <>
      <Card style={{ width: 500, margin: '3rem auto', backgroundColor: 'cornsilk' }}>
        <h1> Home page</h1>
        {para && <p> this is Toggling paragraph</p>}
        <About show={false} />
        <Button type='primary' onClick={toggleHandler}>Toggle Para</Button>
        <Button type='default' size='small' onClick={ButtonHandler}>Toggle Button</Button>
      </Card>
    </>
  )
}

export default Home
