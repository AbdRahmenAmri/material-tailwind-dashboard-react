import Links from "@/static/Links";
import useTitle from "@/hooks/title";
import CustomInfo from "./customInfo";

export default function NotFound() {
  useTitle('404 Page Not Found | AI Tailor')

    return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <CustomInfo title={"Page not found"} to={Links.home} toText={" Go back home"} paragraph={"Sorry, we couldn’t find the page you’re looking for."}/>
        </main>
    )
  }
  