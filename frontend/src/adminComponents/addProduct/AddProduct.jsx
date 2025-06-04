import { useState, useRef } from "react";
import "./AddProduct.scss";
import { toast } from "react-toastify";
import { addProduct } from "../../services/adminService";

const AddProduct = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Bicikl",
  });
  const [file, setFile] = useState();
  const formRef = useRef(null);

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const fileChangeHandle = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);
    const res = await addProduct(formData);
    if (res.status === "succesfull") {
      toast.success(res.message);
      formRef.current.reset();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <form className="product-form" onSubmit={onSubmitForm} ref={formRef}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" required onChange={onChangeHandle} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" required onChange={onChangeHandle} />
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            required
            onChange={onChangeHandle}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            required
            onChange={onChangeHandle}
            defaultValue="Bicikl"
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
            onChange={fileChangeHandle}
          />
        </div>
        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
