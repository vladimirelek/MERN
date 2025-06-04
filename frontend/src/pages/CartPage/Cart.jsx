import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItem } from "../../store/cart/cartSlice";
import { changeNumberOfItems } from "../../store/cart/cartSlice";
import useCurrencyConverter from "../../../utils/currencySelect";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cartStore);
  const changeQuantity = (_id, plusOrMinus) => {
    dispatch(changeNumberOfItems({ _id, plusOrMinus }));
  };
  const convertPrice = useCurrencyConverter();
  const deleteItemFromCart = (index) => {
    console.log("pokrenuto");
    console.log(index);
    dispatch(deleteCartItem(index));
  };
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.map((item) => {
      total = total + item.price * item.count;
    });
    return convertPrice(total);
  };
  return (
    <div className="cart">
      {cartItems.map((item, index) => (
        <div className="cart-item" key={item._id}>
          <img
            src={`http://localhost:4001/uploads/${item.image}`}
            alt={item.title}
            className="cart-item__image"
          />

          <div className="cart-item__details">
            <h3 className="cart-item__title">{item.title}</h3>
          </div>
          <div className="cart-item__controls">
            <button
              className="cart-item__button"
              onClick={() => {
                changeQuantity(item._id, "decrease");
              }}
            >
              -
            </button>
            <span className="cart-item__count">{item.count}</span>
            <button
              className="cart-item__button"
              onClick={() => {
                changeQuantity(item._id, "increase");
              }}
            >
              +
            </button>
            <button
              className="cart-item__delete"
              onClick={() => {
                deleteItemFromCart(index);
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
      <h3>TOTAL PRICE:{calculateTotalPrice()}</h3>
    </div>
  );
};

export default Cart;
