import React from 'react'

import './input.scss'

const Input = ({label, value, onChange}) => (
  <div className="input">
    {label ? <label>{label}</label> : null}
    <input type="text" defaultValue={value} onChange={onChange} />
  </div>
)

export default Input
