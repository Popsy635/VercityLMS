import React from 'react'

type RadioProps = {
    label: string,
    name: string,
    value: string,
    id: string
}

export const Radio = ({label, name, value, id}: RadioProps) => {
    return (
        <div><label htmlFor={id} className='flex items-center relative  gap-2'>
            <input id={id} type="checkbox" name={name} value={value} className='appearance-none border h-5 w-5 rounded-full checked:border-vercity checked:border-6 cursor-pointer peer' />
            {/* <div className='absolute translate-x-1 h-3 w-3 rounded-sm  bg-vercity scale-0 peer-[checked]:scale-100'></div> */}
            {label}
        </label>
        </div>
    )
}
