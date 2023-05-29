import React, { useContext } from 'react'
import { CryptoContext } from '../Context/CryptoContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { numberWithCommas } from './Banner';

const CarouselCrypto = () => {
    const{ symbol, currency, fetchTrandingCoins, trending} = useContext(CryptoContext)

    console.log(trending)
    useEffect(()=>{
        fetchTrandingCoins()
    }, [currency])

  return (
    <div className='sm:flex sm:items-center sm:justify-center gap-10 sm:flex-wrap hidden mt-8'> 
      {
        trending.map((coin) =>{
                  let profit = coin.price_change_percentage_24h > 0;
                  return(
                    
                      <Link to={`/coins/${coin.id}`} key={coin.id}>
                      <div className='flex flex-col items-center'>

                          <img src={coin?.image} alt={coin.name} className='h-16 '/>
                          
                          <span className='flex items-center flex-col uppercase font-bold'>
                              {coin?.symbol}
                              &nbsp;

                              <span className={profit > 0 ? "text-green-600 " : "text-red-700 "}>
                                  {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                              </span>

                          </span>

                          <span className='text-black'>
                              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                          </span>

                      </div>  
                      </Link>
                    
                  )
              })  
      }
  </div>
  )
}

export default CarouselCrypto