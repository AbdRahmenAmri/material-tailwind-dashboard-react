import { API } from "@/static/API";
import axios from "axios";

const createPlan = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.createPlan,data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if(err.response.status === 400) reject(err.response.data);
      });
  });
};

const updatePlan = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API.updatePlan}${data.id}`,data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if(err.response.status === 400) reject(err.response.data);
      });
  });
};

const getAllPlan = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.getAllPlan, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if(err.response.status === 400) reject(err.response.data);
      });
  });
};

const getActivePlan = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.getActivePlan, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if(err.response.status === 400) reject(err.response.data);
      });
  });
};


export { createPlan, updatePlan, getAllPlan, getActivePlan };
