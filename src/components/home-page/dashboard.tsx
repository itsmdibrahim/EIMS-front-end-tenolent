import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

function Dashboard() {
  const preloaderAllTimeRef = useRef<any>(null);
  const { userData }: any = useOutletContext();
  const { toast } = useToast();
  const token: string | undefined = Cookies.get(
    import.meta.env.VITE_AUTH_TOKEN_KEY
  ); // Replace with your token (or undefined for testing)
  // Create headers dynamically
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers[import.meta.env.VITE_AUTH_TOKEN_KEY] = token;
  }

  const fetchDataWithToken = async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/auth/get/${userData.id}`; // Replace with your API URL

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      preloaderAllTimeRef &&
        preloaderAllTimeRef.current.classList.add("hidden");
    } catch (error) {
      console.error("Error fetching data:", error);

      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      preloaderAllTimeRef &&
        preloaderAllTimeRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    fetchDataWithToken();
  }, []);
  return (
    <div className="grid gap-20 lg:px-10 px-5 pt-5">
      <h2 className="text-3xl capitalize text-primary">welcome back</h2>
    </div>
  );
}

export default Dashboard;
