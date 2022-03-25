import React from 'react'
import { GiNotebook } from 'react-icons/gi'
import './header.scss'

const Header = () => {
  return (
    <div className='header_wrapper'>
      <GiNotebook size='4em' />
      <h1>Noteman</h1>
    </div>
  )
}

export default Header
