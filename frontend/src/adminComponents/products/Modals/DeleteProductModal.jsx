import Modal from "react-modal";
import modalStyles from "../../../js/customModal";
import "./DeleteProductModal.scss";
import { useNavigate } from "react-router";
import { deleteProduct } from "../../../services/adminService";
import { toast } from "react-toastify";
const DeleteProductModal = ({
  isOpened,
  setIsOpened,
  currentProduct,
  setProducts,
  products,
}) => {
  const navigate = useNavigate();
  const deleteHadnle = async () => {
    const res = await deleteProduct({
      _id: currentProduct._id,
      image: currentProduct.image,
    });
    if (res.status === "successful") {
      const newProducts = products.filter(
        (item) => item._id !== currentProduct._id
      );
      setProducts(newProducts);
      setIsOpened(false);
      toast.success(res.message);
    } else {
      setIsOpened(false);

      toast.warning(res.message);
    }
  };
  return (
    <Modal isOpen={isOpened} style={modalStyles}>
      <h2>Are you sure?</h2>
      <div className="buttons">
        <button onClick={deleteHadnle}>YES</button>
        <button
          onClick={() => {
            setIsOpened(false);
            navigate("/dashboard/products");
          }}
        >
          BACK
        </button>
      </div>
    </Modal>
  );
};
export default DeleteProductModal;
