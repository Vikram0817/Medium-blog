import React, { ChangeEvent } from 'react'

interface props{
    placeholder: string;
    label: string; 
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
  };

function Input({placeholder, label, onChange, type}: props) {
  return (
    <>
    <label htmlFor={label} className='mb-1 font-semibold w-1/2'>{label}</label>
    <input type={type || "text"} onChange={onChange} className='border mb-3 p-1 px-2 w-1/2' placeholder={placeholder}/>
    </>
  )
}

export default Input