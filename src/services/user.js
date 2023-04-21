import axios from "axios";

const userInfo = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

const generateApiKey = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.generateApiKey, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

const updateUser = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(API.updateUser, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) reject(err.response.data);
      });
  });
};

export { userInfo, generateApiKey, updateUser };
