import React from 'react'
import '../styles/css/Input.css'

function Input({
  includeSpaces,
  onChange,
  width,
  height,
  style,
  ref,
  name,
  type,
  value,
  defaultValue,
  pattern,
  placeholder,
  content,
}) {
  return (
    <input
      onKeyDown={
        !includeSpaces
          ? e => {
              if (e.code === 'Space') e.preventDefault()
            }
          : null
      }
      onChange={onChange}
      className={'ipt f-smx'}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      ref={ref}
      id={name}
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      pattern={pattern}
      placeholder={placeholder || `Enter ${name}...`}
      required
    >
      {content}
    </input>
  )
}

export default Input
