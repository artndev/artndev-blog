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
        className="ipt"
        ref={ ref }
        type={ type || "text" }
        id={ name }
        name={ name }
        value={ value }
        defaultValue={ defaultValue }
        placeholder={placeholder || `Enter ${name}...`}
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