import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-950',
    textColor='text-white',
    className='',
    ...props
}) {
  return (
    <button
    className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props} 
    type={type}
    >{children}</button>
  )
}

export default Button
