import React from 'react'

interface props {
    label: string
}
function Button({label}: props) {
  return (
    <button className='border rounded-2xl bg-black text-white p-1 w-1/2 hover:bg-slate-400'>{label}</button>
  )
}

export default Button