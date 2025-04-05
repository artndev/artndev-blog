import React from 'react'

function Input({
  content,
  className,
  ref,
  type,
  name,
  value,
  defaultValue,
  minLength,
  maxLength,
  pattern,
  placeholder,
  width,
  height,
  style,
}) {
  return (
    <input
      className={`ipt f-smx ${className ? ` ${className}` : ''}`}
      ref={ref}
      type={type || 'text'}
      id={name}
      name={name}
      value={value}
      defaultValue={defaultValue}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      placeholder={placeholder || `Enter ${name}...`}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      required
    >
      {content}
    </input>
  )
}

export default Input
