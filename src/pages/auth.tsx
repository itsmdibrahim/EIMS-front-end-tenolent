import WebsiteHeader from "@/common/website-header";
import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="flex h-[100vh] lg:overflow-hidden overflow-x-hidden">
      <div className="h-full lg:min-w-[400px] min-w-full lg:max-w-[400px] lg:p-8 p-4 grid gap-4 place-content-center border-r bg-slate-100">
        <div className="flex gap-4 items-center">
          <WebsiteHeader />
        </div>
        <Outlet />
      </div>

      <div className="pt-20 p-10 lg:flex hidden items-end w-full relative bg-gradient-to-r from-black/50 to-indigo-500/30">
        <img
          src="/auth-bg.jpg"
          alt="image"
          className="z-[-1] absolute top-0 left-0 object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
}

export default Auth;
