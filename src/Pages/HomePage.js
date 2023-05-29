import React from 'react'
import Banner from '../Components/Banner'
import CoinTable from '../Components/CoinTable'

const HomePage = () => {
  return (
    <div>
    <div>
      <Banner/>
    </div>
    <div className='mt-8'>
      <CoinTable/>
    </div>
    </div>  
  )
}

export default HomePage