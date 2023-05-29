import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { TrendingCoins } from "../baseUrl";
import { CoinList } from "../baseUrl";
import { SingleCoin } from "../baseUrl";
import { HistoricalChart } from "../baseUrl"; 


export const CryptoContext = createContext();

export default function AppCryptoContext ({children}){
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [trending, setTrending] = useState([])
    const [loading, setLoading] = useState(false)
    const[coins , setCoins] = useState([])
    const [coinInfo, setCoinInfo] = useState();
    
    const [historicalData, setHistoricalData] = useState()
    const [days, setDays] = useState(1);


    // trending coin API call
    const fetchTrandingCoins = async () =>{
        setLoading(true)
        try{
            const {data} = await axios.get(TrendingCoins(currency));
            setTrending(data);
        } catch(error){
            console.log("Error in fetchin Coin data", error)
            setTrending([])
        }
        setLoading(false)
    }

    //Cointable info API call
    const fetchCoins = async () =>{
        setLoading(true)
        try{
            const {data} = await axios.get(CoinList(currency));
            setCoins(data)
        } catch(error){
            console.log("Error in Fetching CoinTable info")
            setCoins([])
        }
        setLoading(false)
    }

    // One coin info APi Call
    const fetchCoinInfo = async (id) =>{
        try{
            const {data} = await axios.get(SingleCoin(id))
            setCoinInfo(data);
        } catch(error){
            console.log("Error in Fetching Individual Coin Info")
            
        }
      };

    //Historical data api call
    const fetchHistoricalData = async (coinInfo, days, currency) =>{
        setLoading(true)
        try{
            const {data} = await axios.get(HistoricalChart(coinInfo.id, days, currency));
            setHistoricalData(data.prices)
        } catch (error){
            console.log("Error in fetching Historical Data")
        }
        setLoading(false)
    }     






    useEffect(() =>{
        if(currency === "INR") setSymbol("₹")
        else if (currency === "USD") setSymbol("$");
    },[currency]);

    const value = {
        currency,
        setCurrency,
        symbol,
        setSymbol,
        trending,
        setTrending,
        loading,
        setLoading,
        fetchTrandingCoins,
        coins,
        setCoins,
        fetchCoins,
        fetchCoinInfo,
        setCoinInfo,
        coinInfo,
        
        historicalData,
        setHistoricalData,
        days,
        setDays,
        fetchHistoricalData,
    
    };

    return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
}