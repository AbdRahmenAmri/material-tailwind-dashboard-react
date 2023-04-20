import axios from "axios";

const register = async (data = { name, email, password }) => {
  const response = await axios.post(
    "https://bms.pythonanywhere.com/api/v1/auth/register", data
  );
  return response.data;
};

const confirmEmail = async (token) => {
  const response = await axios.get(
    `https://bms.pythonanywhere.com/api/v1/auth/confirm-email/${token}`
  );
  return response.data;
};

const login = async (data = { email, password }) => {
  const response = await axios.post(
    "https://bms.pythonanywhere.com/api/v1/auth/login",
    data,
    { withCredentials: true }
  );
  return response.data;
};

const resetPasswordRequest = async (data = { email: email }) => {
  const response = await axios.post(
    "https://bms.pythonanywhere.com/api/v1/auth/reset-password-request",
    data
  );
  return response.data;
};

const confirmResetPasswordToken = async (token) => {
  const response = await axios.get(
    `https://bms.pythonanywhere.com/api/v1/auth/reset-password/${token}`
  );
  return response.data;
};

const resetPasswordPost = async (token, password) => {
  const response = await axios.post(
    `https://bms.pythonanywhere.com/api/v1/auth/reset-password/${token}`,
    { password: password }
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.delete(
    "https://bms.pythonanywhere.com/api/v1/auth/logout",
    { withCredentials: true }
  );
  return response.data;
};

const isAdmin = async () => {
  return new Promise((resolve, reject) => {
    axios.get(
      "https://bms.pythonanywhere.com/api/v1/auth/is-admin",
      { withCredentials: true }
    ).then(res=>resolve(res)).catch(err=>reject(err))
  })
};



const isLoged = async () => {
  return new Promise((resolve, reject)=>{
    isAdmin().then(res=>{
      if(res.status === 200) resolve(true)
    }).catch(err=>{
      console.log(err);
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
      console.log(err);
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
