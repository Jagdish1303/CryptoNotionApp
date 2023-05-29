import React, { useContext, useEffect } from 'react'
import { CryptoContext } from '../Context/CryptoContext'
import { numberWithCommas } from './Banner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Spinner from './Spinner';


const CoinTable = () => {

    const {coins, loading, fetchCoins, currency, symbol} = useContext(CryptoContext);
    const navigate = useNavigate();
    const[page, setPage] = useState(1);
    const[search, setSearch] = useState('')
    
    useEffect(()=>{
        fetchCoins()
    }, [currency])

    const handleSearch = () =>{
        return coins.filter(
            (coin) => coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };
    
  return (
    <div className='w-11/12 mx-auto flex flex-col   '>
            <h2 className=' sm:text-2xl text-lg text-center font-semibold text-slate-400 '>
                Cryptocurrency Prices by Market Cap
            </h2>
            <div className='mt-4 flex justify-center w-[100%]'>
                <input onChange={(e) => setSearch(e.target.value)} 
                    className='md:w-[60%] w-[100%] py-3 text-black text-center border-2 border-blue-800 shadow-lg rounded-xl placeholder:text-lg placeholder:font-normal text-lg font-semibold' placeholder='Search for a Crypto Currency..'/>
            </div>
            <div className='w-[100%] h-[100%] mt-5'>
            {
                loading ? (<div className='h-[80vh] flex justify-center items-center'><Spinner/></div>) :
                (
                    <Table className='table-fixed w-[100%] h-[100%]'>
                        <Thead className="bg-gradient-to-r from-slate-900 to-fuchsia-400">
                            <Tr>
                                {
                                    ["Coin", "Price", "24h Change", "Market Cap"].map((head) =>(
                                        <Th key={head} className='lg:text-center xs:text-left p-4 text-black text-lg'>
                                            {head}
                                        </Th>
                                    ))
                                }
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                handleSearch().slice((page-1)*10, (page-1)*10+10).map((row) =>{
                                    const profit = row.price_change_percentage_24h > 0;
                                    return(
                                        <Tr key={row.name} onClick={() => navigate(`/coins/${row.id}`)}
                                         className='text-center cursor-pointer hover:scale-x-105 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] transition-all duration-300' 
                                        >    
                                            <Td className='lg:flex xs:flex-row lg:ml-[26%] gap-4 p-5 text-left'>
                                                
                                                    <img src={row.image} className='h-14'/>
                                                    <div className='flex flex-col items-start'>
                                                        <span className='uppercase'>{row.symbol}</span>
                                                        <span>{row.name}</span>
                                                    </div>
                                                
                                            </Td>

                                            <Td>
                                                <div>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </div>
                                            </Td>

                                            <Td>
                                                <span className={ profit > 0 ? 'text-green-700' : 'text-red-700' }>
                                                    {profit && '+'}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </span>
                                            </Td>

                                            <Td>
                                                {symbol}{" "}
                                                {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                            </Td>
                                        </Tr>
                                    )
                                })
                            }
                            </Tbody>
                    </Table>
                )
            }

            </div>
            <div className='py-6'>
                <Pagination className='bg-white flex justify-center'
                        color="primary"
                        count = {(handleSearch().length/10).toFixed(0) || 0}
                        onChange={(_, value) =>{setPage(value);
                                            window.scroll(0, 450);
                                            }}/>
            </div>                     
                        
    </div>
  )
}

export default CoinTable