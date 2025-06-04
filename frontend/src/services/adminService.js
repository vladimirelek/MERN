import axios from "axios";

export const addProduct = async (product) => {
  try {
    const res = await axios.post("/api/admin/product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "succesfull") {
      return {
        status: res.data.status,
        message: res.data.message,
        product: res.data.product,
      };
    }
    return {
      status: res.data.err.status,
      message: res.data.message,
    };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};

export const deleteProduct = async ({ _id, image }) => {
  try {
    const res = await axios.delete(`/api/admin/product/${_id}/${image}`);
    if (res.data.status === "successful") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
    return {
      status: res.data.err.status,
      message: res.data.message,
    };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};

export const getComments = async () => {
  try {
    const res = await axios.get(`/api/admin/getComments`);
    if (res.data.status === "successful") {
      return {
        status: res.data.status,
        comments: res.data.comments,
      };
    }
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};

export const updateCommentStatus = async (id, newStatus) => {
  try {
    const res = await axios.patch(`/api/admin/updateComment`, {
      id,
      newStatus,
    });
    if (res.data.status === "successful") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};

export const updateProduct = async (data) => {
  try {
    const res = await axios.put(`/api/admin/product`, data);
    if (res.data.status === "successful") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};

export const getDashboardStats = async () => {
  try {
    const [usersRes, productsRes, commentsRes] = await Promise.all([
      axios.get("/api/user/getAllUsers"),
      axios.get("/api/product/getAllProducts"),
      axios.get("/api/admin/getComments"),
    ]);

    return {
      totalUsers: usersRes.data.users.length,
      totalProducts: productsRes.data.products.length,
      totalComments: commentsRes.data.comments.length,
      status: "successful",
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "Failed to fetch statistics",
      status: "error",
    };
  }
};
