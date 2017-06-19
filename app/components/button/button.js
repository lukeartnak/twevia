import React from 'react'

import './button.scss'

const Button = ({onClick, theme = 'default', block, children}) => (
  <button className={`button button--${theme} ${block ? 'button--block' : ''}`} onClick={onClick}>
    {children}
  </button>
)

export default Button
