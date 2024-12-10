import { coursesTableHead } from "@/consts";
import CoursesTable from "./create-course/courses-table";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { useOutletContext } from "react-router-dom";

function AvailableCourses() {
  const { userData }: any = useOutletContext();
  const [showData, setShowData] = useState<any>([]);
  const [isDataLoading, setIsDataLoading] = useState<any>(true);
  console.log(userData);

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
    setIsDataLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/api/course/get`; // Replace with your API URL

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

      setShowData(data.data);
      setIsDataLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);

      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchDataWithToken();
  }, []);

  return (
    <div className="relative lg:px-10 px-5 h-full pt-5">
      <CoursesTable
        tableHead={coursesTableHead}
        showData={showData}
        setShowData={setShowData}
        isDataLoading={isDataLoading}
      />
    </div>
  );
}

export default AvailableCourses;
