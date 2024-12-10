import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CustomJwtPayload extends JwtPayload {
  user?: any; // Add 'user' or other custom fields here
}

function useAuthenticate() {
  const navigate = useNavigate();
  const cookie = Cookies.get(import.meta.env.VITE_AUTH_TOKEN_KEY);

  const decodedJWT =
    cookie && cookie != "undefined" && cookie != undefined
      ? jwtDecode<CustomJwtPayload>(cookie)
      : null;

  function handleNavigation(userType: string) {
    if (userType == "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  }

  function setCookie(data: any) {
    // Set a cookie
    Cookies.set(import.meta.env.VITE_AUTH_TOKEN_KEY, data.token, {
      expires: 1,
    }); // Expires in 1 days
    // Set a cookie
    Cookies.set(
      import.meta.env.VITE_AUTH_USER_DATA,
      JSON.stringify(jwtDecode<CustomJwtPayload>(data.token).user),
      {
        expires: 1,
      }
    ); // Expires in 1 days

    handleNavigation(jwtDecode<CustomJwtPayload>(data.token).user?.userType);
  }

  useEffect(() => {
    if (cookie != "" && cookie != undefined && decodedJWT != null) {
      handleNavigation(decodedJWT.user.userType);
    }
  }, []);

  return [setCookie];
}

export default useAuthenticate;
