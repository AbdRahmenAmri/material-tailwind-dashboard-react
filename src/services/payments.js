import axios from "axios";
import {
  CreditCardIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { API } from "@/static/API";

const paymentsHistory = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.paymentsHistory, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.info) {
          let model = {
            icon: InformationCircleIcon,
            color: "text-blue-500",
            title: "No DATA",
            description: "",
          };
          resolve([model]);
        } else {
          let response = [];
          res.data.map((el, index) => {
            let model = {
              icon: CreditCardIcon,
              color: "text-green-500",
              title: `$${el.amount}, ${el.plan}`,
              description: `Start at: ${el.startDate}\tEnd at: ${el.endDate}`,
            };
            response.push(model);
          });
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

const createOrder = async (data) => {
  // Order is created on the server and the order id is returned
  const response = await axios.post(API.createPaymet, data, {
    withCredentials: true,
  });
  return response.data.paymentID;
};

const onApprove = async (data) => {
  // Order is captured on the server and the response is returned to the browser
  return await new Promise((resolve, reject) => {
    axios
      .post(API.executePayment, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data.success);
      })
      .catch((err) => {
        if (err.response.status === 400) return reject(err.response.data.error);
        else reject("An error accured try later.");
      });
  });
};

export { paymentsHistory, createOrder, onApprove };
