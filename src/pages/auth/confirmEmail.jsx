import useTitle from '@/hooks/title'
import Links from '@/static/Links'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { confirmEmail } from '@/services/Auth'
import Header from '@/layouts/header'
import draw2 from "@/assets/svg/draw2.svg";


const ConfirmEmail = () => {
    useTitle('Confirm Email | AI Tailor')
    const params = useParams()
  
    const [response, setResponse] = useState('')

    const handleConfirmEmail = async (token)=>{
      await confirmEmail( token ).then((data)=>{
          setResponse(data.success)
        }).catch((err)=>{
          if(err.response.data.error){
            setResponse(err.response.data.error)
          }
        })
          
    }
    useEffect( ()=>{
        const token = params.token;
        handleConfirmEmail(token)
    },[ params.token])
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

          <div className="text-center">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Confirm Email </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">{response}.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to={Links.login}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back Login
        </Link>
      </div>
    </div>
        </div>
      </div>
    </section>
  )
}

export default ConfirmEmail


/*

<div className="text-center">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Confirm Email </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">{response}.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to={Links.login}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back Login
        </Link>
      </div>
    </div>

*/