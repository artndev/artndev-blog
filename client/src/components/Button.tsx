import React from 'react'
import '../styles/css/Button.css'

const Button: React.FC<IButtonProps> = ({
  isInverted,
  isStatic,
  isPressed,
  onClick,
  width,
  height,
  style,
  ref,
  type,
  content,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn f-smx${isStatic ? ' static' : ''}${isInverted ? ' invert' : ''}${isPressed ? ' pressed' : ''}`}
      ref={ref}
      type={type}
      style={{
        width: width,
        height: height,
        ...style,
      }}
    >
      {content}
    </button>
  )
}

export default Button
