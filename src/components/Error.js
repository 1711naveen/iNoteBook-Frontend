import React from 'react'

const Error = (props) => {
  return (
    <div className='container'>
      <h1>server down try later {props.showError}</h1>
    </div>
  )
}

export default Error
