import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CryptoContext } from '../Context/CryptoContext';

const Header = () => {
    const {currency, setCurrency} = useContext(CryptoContext);
    // console.log(currency)
  return (
    <div className=' min-w-full p-3 bg-gradient-to-r from-slate-900 to-fuchsia-400 sticky top-0 z-10'>
      <div className='container flex justify-between items-center mx-auto'>
        <div className=' text-blue-800 font-[Montserrat] font-bold'>
          <Link to="/" className='text-lg'>Crypto Notion</Link>
        </div>
        <div className=' text-center'>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className='bg-transparent border-2 px-4 py-2 rounded-md '>
            <option className='bg-[#fff]' value={"INR"} >INR</option>
            <option className='bg-[#fff]' value={"USD"} >USD</option>
          </select>
        </div> 
      </div> 
    </div>
  )
}

export default Header