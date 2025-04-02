import React from 'react'


function Button({
    content,  
    className,
    ref,
    type, 
    onClick,
    width, 
    height,
    style
}) {
  return (
    <button 
        className={`btn f-smx ${className ? ` ${className}` : ""}`}
        ref={ ref }
        type={ type || "button" }
        onClick={ onClick }
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