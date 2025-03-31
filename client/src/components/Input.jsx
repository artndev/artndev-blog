import React from 'react'


function Input({ 
    content, 
    ref,
    type, 
    name,
    value,
    defaultValue,
    placeholder,
    width, 
    height, 
    style 
}) {
  return (
    <input 
        ref={ ref }
        type={ type || "text" }
        id={ name }
        name={ name }
        value={ value }
        defaultValue={ defaultValue }
        placeholder={placeholder || `Enter ${name}...`}
        className="inpt"
        style={{
            width: width,
            height: height,
            ...style
        }}
        required
    >
        { content }
    </input>
  )
}

export default Input