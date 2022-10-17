import React from "react";
import "./App.css";
import Coin from "./components/coin";

function App() {
  const [coins, setCoins] = React.useState([]);
  const coinsToDisplay: number = 8;
  enum CoinsToDiscardEnum {
    FCT = "FCT",
    USDT = "USDT",
    LUNA = "LUNA",
    USDC = "USDC",
    CRO = "CRO",
  }

  React.useEffect(() => {
    const coinsToDiscard = [
      CoinsToDiscardEnum.FCT,
      CoinsToDiscardEnum.USDC,
      CoinsToDiscardEnum.USDT,
      CoinsToDiscardEnum.LUNA,
      CoinsToDiscardEnum.CRO,
    ];

    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log("ALL COINS", data);

        const result = data.coins
          .filter((coin: any) => !coinsToDiscard.includes(coin.symbol))
          .filter((coin: any, index: any) => index < coinsToDisplay)
          .map((coin: any) => ({
            name: coin.symbol,
            price: coin.price,
            delta24h: coin.delta_24h,
          }));
        setCoins(result);
      });
  }, [CoinsToDiscardEnum]);

  console.log("coins", coins);

  const renderCoin = (coin: any) => (
    <Coin
      key={coin.name}
      price={parseFloat(coin.price).toPrecision(5)}
      image={`/icons/${coin.name}.png`}
      delta24h={parseFloat(coin.delta24h)}
    />
  );

  return (
    <div className="App">
      <header className="App-header">
        <div>{coins.map(renderCoin)}</div>
      </header>
    </div>
  );
}

export default App;
