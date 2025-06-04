import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../services/productService";
import "./ShopPage.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoader } from "../../store/loader/loaderSlice";
import Loader from "../../components/Loader/Loader";
import useCurrencyConverter from "../../../utils/currencySelect";
import Filters from "../../components/Filters/Filters";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((store) => store.loaderStore);
  const inputRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState();
  const [filter, setFilter] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });
  const convertPrice = useCurrencyConverter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setTotalPages(Math.ceil(totalProducts / 3));
  }, [products, totalProducts]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const getAllProducts = async () => {
        const query = new URLSearchParams();
        query.append("page", page);
        query.append("limit", 3);
        if (filter.category) query.append("category", filter.category);
        if (filter.minPrice) query.append("minPrice", filter.minPrice);
        if (filter.maxPrice) query.append("maxPrice", filter.maxPrice);
        if (filter.search) query.append("search", filter.search);

        dispatch(setShowLoader(true));
        const res = await getProducts(query);
        if (res.products) {
          setProducts(res.products);
          dispatch(setShowLoader(false));
          setTotalProducts(res.totalProducts);
        }
      };
      getAllProducts();

      return () => clearTimeout(delay);
    }, 500);
  }, [dispatch, filter, page]);

  return (
    <div className="page-container">
      <Filters filter={filter} setFilter={setFilter} inputRef={inputRef} />

      <div className="shop-page-wrapper">
        {selector.showLoader ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div className="shop-page">
            {products.map((item) => (
              <div key={item.id} className="product-card">
                <img
                  className="product-image"
                  src={`http://localhost:4001/uploads/${item.image}`}
                  alt={item.title}
                />
                <h2 className="product-title">{item.title}</h2>
                <p className="product-description">
                  {item.description.slice(0, 100)}...
                </p>
                <span className="product-price">
                  {convertPrice(item.price)}
                </span>
                <button
                  className="view-button"
                  onClick={() => {
                    navigate(`/singleProduct/${item._id}`);
                  }}
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="pagination">
          <div className="buttons">
            <button
              className="pagination-button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <button
              className="pagination-button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          <div>
            <h3>
              Page {page} of {totalPages}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
