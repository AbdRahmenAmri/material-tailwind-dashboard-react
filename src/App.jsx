import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import LandingPage from "@/pages/landing_page";
import Links from "@/static/Links";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ForgetPassword from "@/pages/auth/forgetPassword";
import ResetPassword from "@/pages/auth/resetPassword";
import NotFound from "@/pages/auth/notFound";
import ConfirmEmail from "@/pages/auth/confirmEmail";

function App() {
  return (
    <Routes>
      <Route path={Links.home} element={<LandingPage />} />
      <Route path={Links.login} element={<Login />} />
      <Route path={Links.register} element={<Register />} />
      <Route path={Links.confirm_email} element={<ConfirmEmail />} />
      <Route path={Links.forget_password} element={<ForgetPassword />} />
      <Route path={Links.reset_password} element={<ResetPassword />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
