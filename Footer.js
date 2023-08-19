import React from 'react'
import './styles.css'
const Footer = ({length}) => {
  return (
    <footer>
     {length} {length===1?"Goal":"Goals"}
    </footer>
  )
}

export default Footer
