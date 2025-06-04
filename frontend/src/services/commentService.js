import axios from "axios";
export const addComment = async (data) => {
  try {
    const res = await axios.post("/api/comments/addComment", data);
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
export const getProductComments = async (id) => {
  try {
    const res = await axios.get(`/api/comments/getComments/${id}`);
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
