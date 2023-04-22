import Header from "@/layouts/header";
import Plan from "@/components/plans";
import { Link } from "react-router-dom";
import Links from "@/static/Links";
import useTitle from "@/hooks/title";
import useLogedIn from "@/hooks/use_loged_in";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { Footer } from "@/widgets/layout";

export default function LandingPage() {
  useTitle("Home | AI Tailor");
  useLogedIn();
  return (
    <div className="bg-white py-24 sm:py-32">
      <Header />
      <div className="relative isolate px-6 pt-8 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto h-screen max-w-2xl py-8 sm:py-48 lg:py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Body Measurements with AI.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              AI Tailor web service is now available for integration, allowing
              you to easily incorporate our AI-powered body measurements into
              your app or platform. With our service, you can provide your users
              with accurate and convenient measurements of their height, waist,
              hip, and chest circumference and much more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={Links.register}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                to={Links.documentation}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <div className="gird-cols-1 mb-12 grid w-full gap-12 px-4">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Plans
            </Typography>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2">
            <Plan />
          </CardBody>
        </Card>
      </div>
      <div className="text-blue-gray-600 grid place-items-center">
        <Footer />
      </div>
    </div>
  );
}
