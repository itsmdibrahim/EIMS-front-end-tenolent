import AccountsTable from "@/components/home-page/user-accounts/accounts-table";
import { userAccountTableHead } from "@/consts";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function UserAccounts() {
  const [showData, setShowData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState<any>(true);
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
    const url = `${import.meta.env.VITE_API_URL}/api/auth/users/get`; // Replace with your API URL

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data.data);
      setShowData(
        data.data.filter((obj: any) => {
          if (obj.userType != "admin") {
            return { ...obj };
          }
        })
      );
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
    (async () => {
      await fetchDataWithToken();
    })();
  }, []);

  return (
    <div className="relative lg:px-10 px-5 h-full pt-5">
      <AccountsTable
        tableHead={userAccountTableHead}
        showData={showData}
        setShowData={setShowData}
        isDataLoading={isDataLoading}
      />
    </div>
  );
}

export default UserAccounts;
