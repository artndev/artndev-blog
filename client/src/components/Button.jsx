import React from 'react'


function Button({
    content,  
    ref,
    type, 
    width, 
    height,
    style
}) {
  return (
    <button 
        ref={ref}
        type={ type || "button" }
        className="btn"
        style={{
            width: width,
            height: height,
            ...style
        }}
    >
        { content }
    </button>
  )
}

export default Button