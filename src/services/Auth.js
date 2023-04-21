import { API } from "@/static/API";
import axios from "axios";

const register = async (data = { name, email, password }) => {
  const response = await axios.post(
    API.register, data
  );
  return response.data;
};

const confirmEmail = async (token) => {
  const response = await axios.get(
    `${API.confirmEmail}${token}`
  );
  return response.data;
};

const login = async (data = { email, password }) => {
  const response = await axios.post(
    API.login,
    data,
    { withCredentials: true }
  );
  return response.data;
};

const resetPasswordRequest = async (data = { email: email }) => {
  const response = await axios.post(
    API.resetPasswordRequest,
    data
  );
  return response.data;
};

const confirmResetPasswordToken = async (token) => {
  const response = await axios.get(
    `${API.confirmResetPasswordToken}${token}`
  );
  return response.data;
};

const resetPasswordPost = async (token, password) => {
  const response = await axios.post(
    `${API.resetPasswordPost}${token}`,
    { password: password }
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.delete(
    API.logout,
    { withCredentials: true }
  );
  return response.data;
};

const isAdmin = async () => {
  return new Promise((resolve, reject) => {
    axios.get(
      API.isAdmin,
      { withCredentials: true }
    ).then(res=>resolve(res)).catch(err=>reject(err))
  })
};



const isLoged = async () => {
  return new Promise((resolve, reject)=>{
    isAdmin().then(res=>{
      if(res.status === 200) resolve(true)
    }).catch(err=>{
      if(err.status === 401) reject(false)
      if(err.status === 500) return isLoged()
    })
  });
};

const hasAdmin = async () => {
  return new Promise((resolve, reject)=>{
    isAdmin().then(res=>{
      if(res.status === 200 && res.data.isAdmin === true) resolve(true)
      else reject(false)
    }).catch(err=>{
      if(err.status === 401) reject(false)
      if(err.status === 500) return isLoged()
    })
  });
};

export {
  login,
  register,
  resetPasswordRequest,
  confirmEmail,
  confirmResetPasswordToken,
  resetPasswordPost,
  isAdmin,
  logout,
  isLoged,
  hasAdmin,
};
