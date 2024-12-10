import { FaWallet } from "react-icons/fa6";
import { Link } from "react-router-dom";

function WebsiteHeader() {
  return (
    <div className="lg:mb-2 mb-1">
      <Link to={"/"}>
        <div className="flex gap-2 items-center">
          <FaWallet className="text-xl text-primary mt-1" />

          <h2 className="lg:text-2xl text-lg font-bold tracking-tight">
            Education Institute Management System
          </h2>
        </div>
      </Link>
      <p className="text-light-black lg:text-base text-xs">
        Manage your account online.
      </p>
    </div>
  );
}

export default WebsiteHeader;
