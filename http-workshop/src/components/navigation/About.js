import React from 'react'

const About = (props) => {
  console.log("about page")
  return (
    <div>
      {props.show && <p> about us paragraph</p>}
    </div>
  )
}

export default React.memo(About);
