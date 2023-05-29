import React, { useContext, useEffect } from 'react'
import { CryptoContext } from '../Context/CryptoContext'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
import { chartDays } from '../data';
import SelectButtons from './SelectButtons';
import Spinner from './Spinner';
Chart.register(...registerables);

const CoinInfoChart = () => {

  const {days, setDays, fetchHistoricalData, loading, currency, historicalData, coinInfo} = useContext(CryptoContext)

  useEffect(() =>{
    fetchHistoricalData(coinInfo, days, currency)
  }, [currency, days, coinInfo]);


  return (  

    <div className='mt-3 mb-3'>
    {
      loading ? (<div className='md:h-[80vh] h-[40vh] flex justify-center items-center'><Spinner/></div>) : 
      (
        !historicalData ? (<div className='md:h-[80vh] h-[40vh] flex justify-center items-center'>Data Not Found</div>) : 
        (
          <div className=' md:w-[100%]'>
                <Line 
                      data={{ 
                        labels:historicalData.map( (coinInfo) =>{
                            let date = new Date(coinInfo[0]);
                            let time = date.getHours() > 12 ? `${date.getHours()-12}:${date.getMinutes()} PM`
                                      : `${date.getHours()}:${date.getMinutes()} AM`;
                            
                            return days === 1 ? time : date.toLocaleDateString()
                        } ),

                        datasets:[
                            {
                              data:historicalData.map((coinInfo) => coinInfo[1]),
                              label: `Price (Past ${days} Days) in ${currency}`,
                              borderColor: "#EEBC1D"
                            }
                        ]
                    }}
                    options={{
                      elements :{
                        point :{
                          radius: 1,
                        }
                      }
                    }}
                />
                
                  <div className='flex mt-8 w-full justify-around gap-2'>
                    {
                      chartDays.map( (day) =>(
                        <SelectButtons
                        key={day.value}
                        onClick={() => setDays(day.value)}
                        selected={day.value === days}
                        >
                          {day.label} 
                        </SelectButtons>
                      ) )
                      }
                  </div>
                
            </div>
            
        )
      )
    }

    </div>
  )
}

export default CoinInfoChart