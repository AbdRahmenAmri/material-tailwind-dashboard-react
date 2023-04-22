import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Alert,
  Button,
} from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useLayoutEffect, useState, Fragment } from "react";
import { getActivePlan, getAllPlan } from "@/services/plans";
import { hasAdmin, isLoged } from "@/services/Auth";
import { createOrder, onApprove } from "@/services/payments";
import { Link } from "react-router-dom";
import Links from "@/static/Links";

export function Plan() {
  const [isadmin, setIsadmin] = useState(false);
  const [plans, setPlans] = useState([]);
  const [show, setShow] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);

  const [alertOption, setAlertOption] = useState({ color: "green", text: "" });

  const paymentSuccess = (text) =>
    toast.success(text, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const paymentError = (text) =>
    toast.error(text, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useLayoutEffect(() => {
    hasAdmin()
      .then((res) => {
        setIsadmin(res);
      })
      .then(() => {
        getAllPlan().then((data) => {
          setPlans(data);
        });
      })
      .catch((err) => {
        getActivePlan().then((data) => {
          setPlans(data);
        });
      });
    isLoged()
      .then((res) => setIsLogedIn(res))
      .catch((err) => setIsLogedIn(err));
  }, []);
  return (
    <div className="gird-cols-1 mb-12 grid place-items-center gap-12 px-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {plans.map((plan, index) => (
        <Card
          key={index}
          color="blue"
          variant="gradient"
          className="w-full max-w-[20rem] p-8"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              {plan.name}
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-7xl font-normal"
            >
              <span className="mt-2 text-4xl">$</span>
              {plan.price}{" "}
              <span className="self-end text-xs">/{plan.duration} days</span>
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon strokeWidth={2} className="h-3 w-3" />
                </span>
                <Typography className="font-normal">
                  {plan.description}
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 p-0">
            {" "}
            {isLogedIn ? (
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AUW5TPrs3VGY_KC7GihPhl1liLo-JA-W14Thp4HMyRFL0LcRy_LuGX6q_23xBkfteR5A2o_-82g2-PJK",
                }}
              >
                <PayPalButtons
                  className="text-opacity-0"
                  createOrder={(data) =>
                    createOrder((data = { ...data, planID: plan.id }))
                  }
                  onApprove={(data) =>
                    onApprove((data = { ...data, planID: plan.id }))
                      .then((res) => {
                        paymentSuccess(res);
                      })
                      .catch((err) => {
                        paymentError(err);
                      })
                  }
                  style={{
                    layout: "horizontal",
                    color: "white",
                    tagline: false,
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <Link to={Links.register}>
                <Button
                  size="lg"
                  color="white"
                  className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                  ripple={false}
                  fullWidth={true}
                >
                  Get Started
                </Button>
              </Link>
            )}{" "}
          </CardFooter>
        </Card>
      ))}
      <div>
        <ToastContainer
          position="top-center"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
        />
      </div>
    </div>
  );
}

export default Plan;
