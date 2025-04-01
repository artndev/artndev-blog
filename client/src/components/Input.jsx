import React from 'react'


function Input({ 
    content, 
    className,
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
        className={`ipt${className ? ` ${className}` : ""}`}
        ref={ ref }
        type={ type || "text" }
        id={ name }
        name={ name }
        value={ value }
        defaultValue={ defaultValue }
        placeholder={ placeholder || `Enter ${name}...` }
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