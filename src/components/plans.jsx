const plans = [
  {
    ID: 1,
    name: "Basic - Monthly",
    description: "Basic plan availabe for 30 days",
    price: "70",
    currency: "USD",
  },
  {
    ID: 2,
    name: "Professional - Yearly",
    description: "Professional plan availabe for 365 days.",
    price: "650",
    currency: "USD",
  },
];

export default function Plan() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 h-screen">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Choose the right plan for you
        </h2>
      </div>
      {plans.map((plan) => (
        <div
          className="mx-auto mt-2 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
          key={plan.ID}
        >
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              {plan.name}
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {plan.description}
            </p>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    {plan.currency}
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get access
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
