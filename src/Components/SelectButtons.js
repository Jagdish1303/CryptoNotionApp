import React from 'react'

const SelectButtons = ({children, selected, onClick}) => {
  return (

    <div onClick = {onClick} 
    className= {`text-center border border-yellow-500 cursor-pointer rounded-lg px-5 py-3 ${selected ? "bg-yellow-500 text-black font-bold" : ""  } hover:bg-yellow-300 hover:text-black transition-all duration-200`}
    >
        {/* className=""  */}
        
        {children}
    </div>

  ) 
}

export default SelectButtons