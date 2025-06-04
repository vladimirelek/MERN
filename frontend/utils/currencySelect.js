import { useSelector } from "react-redux";
const useCurrencyConverter = () => {
  const { currency } = useSelector((store) => store.currencyStore);

  const currencySelect = (priceInEuros) => {
    switch (currency) {
      case "EUR":
        return `${(priceInEuros * 1).toFixed(2)} EUR`;
      case "USD":
        return `${(priceInEuros * 1.08).toFixed(2)} USD`;
      case "KM":
        return `${(priceInEuros * 2).toFixed(2)} KM`;
      default:
        break;
    }
  };
  return currencySelect;
};
export default useCurrencyConverter;
