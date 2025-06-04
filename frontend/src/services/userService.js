import axios from "axios";
export const register = async (data) => {
  try {
    const res = await axios.post("/api/user/register", data);
    if (res.status === 201) {
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
export const login = async (data) => {
  try {
    const res = await axios.post("/api/user/login", data);
    if (res.status === 200) {
      return {
        status: res.data.status,
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
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
export const contactAdmin = async (user) => {
  const res = await axios.post("/api/user/contactAdmin", user);
  try {
    if (res.status === 200) {
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
export const getAllUsers = async () => {
  try {
    const res = await axios.get("/api/user/getAllUsers");
    if (res.status === 200) {
      return {
        users: res.data.users,
        status: res.data.status,
      };
    }
    return {
      users: res.data.users,
      status: res.data.err.status,
    };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};
export const getRoomMessages = async (roomId) => {
  try {
    const res = await axios.get(`/api/user/getMessages?roomId=${roomId}`);
    if (res.status === 200) {
      return {
        status: res.data.status,
        messages: res.data.messages,
      };
    }
    return {
      users: res.data.users,
      status: res.data.err.status,
    };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.data.status,
    };
  }
};
