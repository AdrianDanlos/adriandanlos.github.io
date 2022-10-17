type Props = {
  price: string;
  image: string;
  delta24h: number;
};

const Coin = ({ price, image, delta24h }: Props) => {
  const isDeltaPositive = delta24h > 0;
  return (
    <section>
      <img src={image} className="logo" alt="logo" />
      <p className="price">{price}$</p>
      <p className={`${isDeltaPositive ? "green" : "red"} delta`}>
        {isDeltaPositive ? "+" + delta24h : delta24h}%
      </p>
    </section>
  );
};

export default Coin;
