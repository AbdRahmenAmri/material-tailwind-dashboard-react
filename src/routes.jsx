import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {TbGeometry} from 'react-icons/tb'
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import Logout from "./pages/auth/logout";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Plans",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <TbGeometry {...icon} />,
        name: "Try",
        path: "/notifactions",
        element: <Notifications />,
      },
      {
        icon: <ArrowLeftOnRectangleIcon {...icon} />,
        name: "Logout",
        path: "/logout",
        element: <Logout />,
      },
    ],
  }/* ,
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  }, */
];

export default routes;
