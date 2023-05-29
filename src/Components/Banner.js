import React, { useContext } from 'react'
import CarouselCrypto from './CarouselCrypto'



export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Banner = () => {

  

  return (
    <div className='mt-4 w-full h-[80%]'>
        <div className='w-11/12  flex flex-col justify-center text-center mx-auto rounded-xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
                <h1 className='sm:text-[3.5rem] text-3xl p-5 font-bold'>Crypto Notion</h1>
                <p className='mt-4 text-sm text-slate-400 mb-4'>Get All The Info Regarding Your Favorite Crypto Currency</p>
              <div>
                <CarouselCrypto/>
              </div>
        </div>
    </div>
  )
}

export default Banner