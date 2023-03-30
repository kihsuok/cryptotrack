import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin';
import Scroll from './Scroll';



function App() {
  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
       setCoins(res.data)
       console.log(res.data)
    }).catch(error=>console.log(error))
  }, [])
  const handleChange = e =>{
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="coin-app">
      <h1 style={{marginBottom: '25px', color: 'black',backgroundColor: '#e08f43', margin:'15px', padding: '10px',borderRadius:'15px'}}>CRYPTO TRACKER</h1>

        <form action="" >
          <input type="text" className="coin-input" placeholder="🔎 Search Coin" color="black" onChange={handleChange}/>
        </form>
        <table>
          <th style={{width:'100px'}} >Name</th>
          <th style={{width:'380px'}} >Price</th>
          <th style={{width:'200px'}}>Change in 24 hours</th>
          <th style={{width:'400px'}}>Market cap</th>
        </table>
    
        <Scroll>
			{filteredCoins.map(coin=>{
				return(
				<Coin 
				key={coin.id} 
				name={coin.name} 
				image={coin.image} 
				symbol={coin.symbol}
				marketcap={coin.market_cap}
				price={coin.current_price}
				pricechange={coin.price_change_percentage_24h}
		//           volume={coin.total_volume}
				/>
				);
			})}
        </Scroll>

    </div>
  );
}

export default App;