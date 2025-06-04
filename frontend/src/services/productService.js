import axios from "axios";

export const getProducts = async (query) => {
  try {
    const url = query
      ? `/api/product/getAllProducts?${query.toString()}`
      : "/api/product/getAllProducts";

    const res = await axios.get(url);
    return {
      products: res.data.products,
      totalProducts: res.data.totalProducts,
    };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};
export const getSingleProduct = async (id) => {
  try {
    const res = await axios.get(`/api/product/${id}`);
    if (res.data.status === "succesfull") {
      return {
        product: res.data.product,
        status: res.data.status,
      };
    }
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};
export const rateItem = async (star, id, userId) => {
  try {
    const res = await axios.patch(`/api/product/${id}`, { star, userId });
    if (res.data.status === "successful") {
      return {
        message: res.data.message,
        status: res.data.status,
      };
    }
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};
