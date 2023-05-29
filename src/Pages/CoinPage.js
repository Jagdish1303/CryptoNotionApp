import React, { useContext, useEffect } from 'react'
import { CryptoContext } from '../Context/CryptoContext'
import CoinInfoChart from '../Components/CoinInfoChart';
import { numberWithCommas } from '../Components/Banner';
import { useParams } from 'react-router-dom';

const CoinPage = () => {
  const {currency, symbol, fetchCoinInfo, coinInfo} = useContext(CryptoContext);
  const {id} = useParams();
  useEffect(() =>{
    fetchCoinInfo(id)
  }, [])


  return (
    <div className='lg:flex md:items-center justify-start w-screen'>

      <div className='lg:w-[25%] md:w-[100%] xs:w-[100%] flex flex-col items-center justify-start mt-6 lg:border-r-2 lg:border-gray-600 '>
        {/* Sidebar */} 
        <img src={coinInfo?.image.large} alt={coinInfo?.name} height="200" className='mb-5'/>
        <h1 className='text-xl font-bold mb-5 font-[Montserrat]'>{coinInfo?.name}</h1>
        <div className='w-[100%] md:flex md:flex-col md:items-center '>
        <p className='w-[100%] font-[Montserrat] p-6 pb-4 pt-0 text-left whitespace-pre-line'>
        {
          
          coinInfo?.description.en.length > 0 ? (`${coinInfo?.description.en.split(". ")[0]}.`) : (<p>Not Found</p>)
        }
        </p>
        
        <div className='lg:flex lg:flex-col w-full gap-y-4 mt-3 lg:items-start
              pl-5 md:flex-row md:justify-around flex-col items-center'>
          <span className='flex'>
            <p className='text-lg font-bold'>Rank: <span className='font-normal'>{coinInfo?.market_cap_rank}</span></p> 
          </span>

          <span className='flex'>
            { coinInfo && 
              <div>
                <p className='text-lg font-bold'>Current Pirce: <span className='font-normal'>{symbol}{" "}{numberWithCommas(coinInfo?.market_data.current_price[currency.toLowerCase()])} </span></p>
              </div>
            }
          </span>

          <span className='flex'>
            { coinInfo && 
              <div>
                <p className='text-lg font-bold'>Market Cap: 
                <span className='font-normal'>{symbol}{" "}{numberWithCommas(coinInfo?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M </span></p>
              </div>
            }
          </span>

        </div>
        </div>
      </div>

      {/* Chart */}
      <div className='lg:w-[75%] w-[100%]'>
      <CoinInfoChart coinInfo={coinInfo} />
      </div>
    </div>
  )
}

export default CoinPage