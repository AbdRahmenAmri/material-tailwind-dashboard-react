import { API } from "@/static/API";
import { CircleStackIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { chartsConfig } from "@/configs";

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
        reject(err.response.status);
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
        reject(err.response.status);
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

const getUserToken = async () => {
  return new Promise((resolve, reject) => {
    let model = {
      color: "yellow",
      icon: CircleStackIcon,
      title: "Available Token",
      value: "",
    };
    axios
      .get(API.userInfo, {
        withCredentials: true,
      })
      .then((res) => {
        model.value = res.data.token;
        resolve(model);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
};

const getUserSubscription = async () => {
  return new Promise((resolve, reject) => {
    let model = {
      color: "pink",
      icon: CircleStackIcon,
      title: "Current Plan",
      value: "",
    };
    axios
      .get(API.currentSubscription, {
        withCredentials: true,
      })
      .then((res) => {
        if(res.status === 200 && !res.info) model.value = `${res.data.plan}`
        else model.value = res.data.info
        resolve(model);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
};

const yearlyRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://bms.pythonanywhere.com/api/v1/user/yearly-requests", {
        withCredentials: true,
      })
      .then((res) => {
        let data = Object.keys(res.data);
        let values = Object.values(res.data);
        let keys = [];
        data.forEach((el) => {
          keys.push(new Date(el).toLocaleString("en-us", { month: "short" }));
        });

        let model = {
          color: "blue",
          title: "Monthly Requests",
          description: "Requests during 12 months ago",
          chart: {
            type: "bar",
            height: 220,
            series: [
              {
                name: "Requests",
                data: values,
              },
            ],
            options: {
              ...chartsConfig,
              colors: "#fff",
              plotOptions: {
                bar: {
                  columnWidth: "16%",
                  borderRadius: 5,
                },
              },
              xaxis: {
                ...chartsConfig.xaxis,
                categories: keys,
              },
            },
          },
        };
        resolve(model);
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

const monthlyRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://bms.pythonanywhere.com/api/v1/user/monthly-requests", {
        withCredentials: true,
      })
      .then((res) => {
        let data = Object.keys(res.data);
        let values = Object.values(res.data);
        let keys = [];
        data.forEach((el) => {
          keys.push(new Date(el).getUTCDate());
        });

        let model = {
          color: "pink",
          title: "Daily Requests",
          description: "Requests during 30 days ago",
          chart: {
            type: "line",
            height: 220,
            series: [
              {
                name: "Requests",
                data: values,
              },
            ],
            options: {
              ...chartsConfig,
              colors: ["#fff"],
              stroke: {
                lineCap: "round",
              },
              markers: {
                size: 5,
              },
              xaxis: {
                ...chartsConfig.xaxis,
                categories: keys,
              },
            },
          },
        };
        resolve(model);
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

export {
  userInfo,
  generateApiKey,
  updateUser,
  getUserToken,
  getUserSubscription,
  monthlyRequest,
  yearlyRequest,
};
