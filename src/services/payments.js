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
          resolve(model);
        } else {
          let model = {
            icon: CreditCardIcon,
            color: "text-green-500",
            title: `$${res.data.amount}, ${res.data.plan}`,
            description: `Start at: ${res.data.startDate}\tEnd at: ${res.data.endDate}`,
          };
          resolve(model);
        }
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

export { paymentsHistory };
