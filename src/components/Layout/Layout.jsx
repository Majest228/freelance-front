import React from 'react'
import Header from './Header/Header.jsx'
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Layout
