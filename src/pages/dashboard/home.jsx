import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  projectsTableData,
  ordersOverviewData,
  statisticsChartsData,
} from "@/data";
import { useLayoutEffect } from "react";
import useTitle from "@/hooks/title";
import { hasAdmin } from "@/services/Auth";
import {
  dailyUser,
  monthlyEarn,
  yearlyEarn,
  yearlyUser,
} from "@/services/admin";
import { string } from "prop-types";
import { paymentsHistory } from "@/services/payments";

export function Home() {
  useTitle("Dashboard Home");
  const [isadmin, setIsadmin] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [isChartsReady, setChartsReady] = useState(false);
  const [isCardsReady, setCardsReady] = useState(false);
  const [isPaymentsReady, setPaymentsReady] = useState(false);

  useLayoutEffect(() => {
    hasAdmin()
      .then((res) => {
        setIsadmin(res);
      })
      .then(() => {
        monthlyEarn()
          .then((data) => {
            setCardsData((cardsData) => [...cardsData, data]);
          })
          .then(() => {
            yearlyEarn().then((data) => {
              setCardsData((cardsData) => [...cardsData, data]);
              setCardsReady(true);
            });
          });
        yearlyUser()
          .then((data) => {
            console.log(data);
            console.log(statisticsChartsData[0]);
            setChartsData((chartsData) => [...chartsData, data]);
          })
          .then(() => {
            dailyUser().then((data) => {
              setChartsData((chartsData) => [...chartsData, data]);
              setChartsReady(true);
            });
          });
      })
      .catch((err) => {
        setIsadmin(err);
      });0
      paymentsHistory().then(data=>{
        setPaymentsData(paymentsData=>[...paymentsData, data])
        setPaymentsReady(true)
      })
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {isCardsReady &&
          cardsData.map(({ icon, title, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
            />
          ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 lg:grid-cols-2 xl:grid-cols-2">
        {isChartsReady &&
          chartsData.map((props) => (
            <StatisticsChart key={props.title} {...props} />
          ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Payments History
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            { isPaymentsReady &&
              paymentsData.map(
                ({ icon, color, title, description }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                        key === ordersOverviewData.length - 1
                          ? "after:h-0"
                          : "after:h-4/6"
                      }`}
                    >
                      {React.createElement(icon, {
                        className: `!w-5 !h-5 ${color}`,
                      })}
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium"
                      >
                        {title}
                      </Typography>
                      <Typography
                        as="span"
                        variant="small"
                        className="text-xs font-medium text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                )
              )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
