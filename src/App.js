import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';



function App() { 

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col bg-[#ffffff] text-black'>
      <div className=''>
        <Header/>
        <Routes>      
          <Route path="/coins/:id" Component={CoinPage}/>
          <Route path="/" Component={HomePage}/>
        </Routes> 
      </div>
    </div>

);
}

export default App;
