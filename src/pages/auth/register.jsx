import Header from "@/layouts/header";
import React, { useState } from "react";
import draw2 from "@/assets/svg/draw2.svg";
import { Link } from "react-router-dom";
import Input from "@/components/input";
import Links from "@/static/Links";
import useTitle from "@/hooks/title";
import { register } from "@/services/Auth";

export default function Register() {
  useTitle('Register | AI Tailor')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [response, setResponse] = useState('')

  const handleRegister = async () => {
      await register({ name, email, password }).then((data)=>{
        console.log(data.token)
        setResponse(data.success)
      }).catch((err)=>{
        if(err.response.data.error){
          setResponse(err.response.data.error)
        }
      })
  };
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
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
        <Header />
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img src={draw2} className="w-full" alt="Undraw For Auth form" />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form>
              <h1 className="text-center text-gray-700 text-3xl mb-4">Register</h1>
              <Input
                id={"name"}
                placeholder={"Full Name"}
                type={"text"}
                setValue={setName}
                />
              <Input
                id={"email"}
                placeholder={"Email Adresse"}
                type={"text"} 
                setValue={setEmail}
                />
              <Input
                id={"password"}
                placeholder={"Password"}
                type={"password"}
                setValue={setPassword}

              />
              <span className="my-6 flex items-center justify-center text-gray-700">{response}</span>
              <button
                type="button"
                className="bg-gray-200 inline-block w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-gray-700 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                onClick={handleRegister}
                >
                Sign up
              </button>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              <Link
                className="mb-3 flex w-full items-center justify-center rounded bg-gray-700 px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                to={Links.login}
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
