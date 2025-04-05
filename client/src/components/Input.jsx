import React from 'react'

function Input({
  content,
  className,
  ref,
  type,
  onKeyDown,
  onChange,
  name,
  value,
  defaultValue,
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
      onKeyDown={onKeyDown}
      onChange={onChange}
      id={name}
      name={name}
      value={value}
      defaultValue={defaultValue}
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
