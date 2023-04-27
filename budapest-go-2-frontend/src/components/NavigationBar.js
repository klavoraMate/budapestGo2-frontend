import React from 'react'
import './navigationBar.css'
import './elements.css'

function NavigationBar() {
  return (
    <div className='navigationBar'>
      <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
      <h2 className='workspaceLabel'>workspace</h2>
    </div>
  )
}

export default NavigationBar