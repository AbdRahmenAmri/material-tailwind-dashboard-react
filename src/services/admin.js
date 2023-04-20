import axios from "axios";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { chartsConfig } from "@/configs";

const monthlyEarn = async () => {
  return new Promise((resolve, reject) => {
    let model = {
      color: "blue",
      icon: BanknotesIcon,
      title: "",
      value: "",
    };
    axios
      .get("https://bms.pythonanywhere.com/api/v1/admin/payments/monthly", {
        withCredentials: true,
      })
      .then((res) => {
        model.title = "Monthly Earnig";
        model.value = "$" + res.data.monthly;
        resolve(model);
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

const yearlyEarn = async () => {
  return new Promise((resolve, reject) => {
    let model = {
      color: "green",
      icon: BanknotesIcon,
      title: "",
      value: "",
    };
    axios
      .get("https://bms.pythonanywhere.com/api/v1/admin/payments/yearly", {
        withCredentials: true,
      })
      .then((res) => {
        model.title = "Yearly Earnig";
        model.value = "$" + res.data.yearly;
        resolve(model);
      })
      .catch((err) => {
        reject(err.status);
      });
  });
};

const yearlyUser = async () => {
  return new Promise((resolve, reject) => {
    
    axios
      .get("https://bms.pythonanywhere.com/api/v1/admin/users/monthly", {
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
            title: "Monthly Users",
            description: "Users registered during 12 months ago",
            chart: {
              type: "bar",
              height: 220,
              series: [
                {
                  name: "Users",
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

const dailyUser = async () => {
  return new Promise((resolve, reject) => {

    axios
      .get("https://bms.pythonanywhere.com/api/v1/admin/users/daily", {
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
            title: "Daily Users",
            description: "Users registered during 30 days ago",
            chart: {
              type: "line",
              height: 220,
              series: [
                {
                  name: "Users",
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

export { monthlyEarn, yearlyEarn, yearlyUser, dailyUser };
