import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchCoin = async () => {
    const apiKey = import.meta.env.VITE_API_KEY; 
    const options = {
        method: 'GET',
        headers: {acccept: 'application/json', 'x-cg-demo-api-key': apiKey},
    };
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,options)
        .then(response =>  response.json())
        .then(response => setAllCoin(response))
        .catch(err => console.log(err));
  }
  useEffect(() => {
    fetchCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    fetchCoin
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
