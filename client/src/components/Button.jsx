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
        className={`btn${(className && ` ${className}`) || ""}`}
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