import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { getSingleProduct } from "../../services/productService";
import { toast } from "react-toastify";
import "./SingleProduct.scss";
import useCurrencyConverter from "../../../utils/currencySelect";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../store/cart/cartSlice";
import { addComment, getProductComments } from "../../services/commentService";
import { rateItem } from "../../services/productService";
const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { user } = useSelector((store) => store.userStore);
  const form = useRef(null);
  const [data, setData] = useState({
    comment: "",
  });
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(product.rating || 0);
  const [hover, setHover] = useState(product.rating || 0);
  const onStarClick = async (star) => {
    setRating(star);
    const res = await rateItem(star, id, user._id);
    if (res.status === "successful") {
      toast.success(res.message);
    }
  };
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      author: user.username,
      productId: product._id,
      productTitle: product.title,
    }));
  }, [product, user]);
  useEffect(() => {
    const getComments = async () => {
      const res = await getProductComments(id);
      console.log(res);
      if (res.status === "successful") {
        const allowedComments = res.comments.filter((item) => item.status);
        setComments(allowedComments);
      }
    };
    getComments();
  }, [id]);
  const currencySelect = useCurrencyConverter();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cartStore);
  const addToCart = (product) => {
    dispatch(setCartItems(product));
    const allCartItems = [...cartItems, product];
    localStorage.setItem("cartItems", JSON.stringify(allCartItems));
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const res = await addComment(data);
    console.log(res);
    if (res.status === "successful") {
      toast.success(res.message);
      form.current.reset();
    } else {
      toast.warning(res.message);
    }
  };
  useEffect(() => {
    const fun = async () => {
      const res = await getSingleProduct(id);
      if (res.status === "succesfull") {
        setProduct(res.product);
        setRating(res.product.rating);
      } else {
        toast.warning(res.message);
      }
    };
    fun();
  }, [id, rating]);
  return (
    <div className="single-product-container">
      <div className="single-product">
        <img
          src={`http://localhost:4001/uploads/${product.image}`}
          alt={product.title}
          className="single-product__image"
        />
        <h2 className="single-product__title">{product.title}</h2>
        <p className="single-product__description">{product.description}</p>
        <p className="single-product__price">
          ${currencySelect(product.price)}
        </p>
        <button
          onClick={() => {
            addToCart(product);
          }}
        >
          Dodaj u korpu
        </button>
      </div>
      <div className="rating">
        <h4>Average rate ({rating.toFixed(2)})</h4>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              hover >= star || rating >= star ? "filled" : ""
            }`}
            onClick={() => onStarClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(product.rating)}
          >
            ★
          </span>
        ))}
      </div>

      <div className="comment-section">
        <h3>Dodaj komentar</h3>
        <form onSubmit={onSubmitForm} ref={form}>
          <textarea
            required
            onChange={(e) => {
              setData((prev) => ({ ...prev, comment: e.target.value }));
            }}
            rows="5"
            placeholder="Unesi komentar..."
          />
          <button type="submit">Pošalji</button>
        </form>
      </div>

      <div className="comments-display">
        <h3>Komentari ({comments.length})</h3>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div className="comment" key={index}>
              <div className="comment-header">
                <h2 className="comment-author">{comment.author} </h2>
                <h4 className="comment-date">
                  {new Date(comment.date).toLocaleDateString("sr-RS", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
              </div>
              <p className="comment-text">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">Nema komentara još uvek.</p>
        )}
      </div>
    </div>
  );
};
export default SingleProduct;
