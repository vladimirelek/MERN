import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import "./Products.scss";
import useCurrencyConverter from "../../../utils/currencySelect";
import DeleteProductModal from "./Modals/DeleteProductModal";
import EditProductModal from "./Modals/EditProductModal";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);
  const [isEditOpened, setIsEditOpened] = useState(false);
  const convertPrice = useCurrencyConverter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      if (res.products) {
        setProducts(res.products);
      } else {
        toast.error(res.message || "Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products">
      {products.map((product, index) => (
        <div className="card" key={product._id}>
          <span className="index">{index + 1}.</span>
          <img
            src={`http://localhost:4001/uploads/${product.image}`}
            alt={product.title}
            className="img"
          />
          <h3>{product.title}</h3>
          <p>{convertPrice(product.price)}</p>
          <button
            className="edit"
            onClick={() => {
              setIsEditOpened(true);
              setCurrentProduct(product);
            }}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => {
              setIsDeleteOpened(true);
              setCurrentProduct(product);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {isDeleteOpened && (
        <DeleteProductModal
          isOpened={isDeleteOpened}
          setIsOpened={setIsDeleteOpened}
          currentProduct={currentProduct}
          setProducts={setProducts}
          products={products}
        />
      )}

      {isEditOpened && (
        <EditProductModal
          isOpened={isEditOpened}
          setIsEditOpened={setIsEditOpened}
          currentProduct={currentProduct}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default Products;
