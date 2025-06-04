import Modal from "react-modal";
import modalStyles from "../../../js/customModal";
import { useNavigate } from "react-router";
import { useState } from "react";
import { updateProduct } from "../../../services/adminService";
import { toast } from "react-toastify";
import { getProducts } from "../../../services/productService";
const EditProductModal = ({
  isOpened,
  setIsEditOpened,
  currentProduct,
  setProducts,
}) => {
  const [data, setData] = useState({
    id: currentProduct._id,
    title: currentProduct.title,
    description: currentProduct.description,
    price: currentProduct.price,
    category: currentProduct.category || "Bicikl",
    image: currentProduct.image,
  });
  const [file, setFile] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(data);
  };
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formDataProduct;
    if (file) {
      formDataProduct = new FormData();
      formDataProduct.append("file", file);
      formDataProduct.append("product", JSON.stringify(data));
    }
    let hasFormData =
      formDataProduct &&
      formDataProduct.has("file") &&
      formDataProduct.has("product");
    const res = await updateProduct(hasFormData ? formDataProduct : data);
    console.log(res);
    if (res.status === "successful") {
      setIsEditOpened(false);
      const res = await getProducts();
      setProducts(res.products);
      navigate("/dashboard/products");
      toast.success(res.message);
    }
  };
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpened} style={modalStyles}>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            required
            defaultValue={data.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            required
            defaultValue={data.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            defaultValue={data.category}
          >
            <option value="Bicikl">Bicikl</option>
            <option value="Steper">Steper</option>
            <option value="Traka">Traka</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            className="file-input"
            accept="image/*"
            onChange={fileChange}
          />
        </div>
        <div className="buttons">
          <button type="submit" className="submit-btn">
            EDIT
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              setIsEditOpened(false);
              navigate("/dashboard/products");
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
