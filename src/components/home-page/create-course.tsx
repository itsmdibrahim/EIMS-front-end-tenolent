import { coursesTableHead } from "@/consts";
import CoursesTable from "./create-course/courses-table";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddBtn from "@/common/add-btn";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { useOutletContext } from "react-router-dom";

function CreateCourse() {
  const { userData }: any = useOutletContext();
  const [showData, setShowData] = useState<any>([]);
  const [isDataLoading, setIsDataLoading] = useState<any>(true);
  const [isSubmitting, setIsSubmitting] = useState<any>(null);
  console.log(userData);

  const [sendData, setSendData] = useState({
    userInfo: userData.id,
  });
  const [isOpen, setIsOpen] = useState<any>(false);
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

  function handleChange(e: any) {
    setSendData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAdd(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(sendData);

    const url = `${import.meta.env.VITE_API_URL}/api/course/add`; // Replace with your API URL

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setShowData((prev: any) => [...prev, data.data]);
      setIsSubmitting(false);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);

      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsSubmitting(false);
    }
  }

  const handleDialogChange = (open: boolean, e: any) => {
    console.log(e);

    setIsOpen(open);

    if (open) {
      //open
    } else {
      //close
    }
  };

  const fetchDataWithToken = async () => {
    setIsDataLoading(true);
    const url =
      userData.userType == "admin"
        ? `${import.meta.env.VITE_API_URL}/api/course/get`
        : `${import.meta.env.VITE_API_URL}/api/course/one-person/get/${
            userData.id
          }`; // Replace with your API URL

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

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

      <div className="fixed bottom-5 right-5">
        <Dialog open={isOpen} onOpenChange={(e) => handleDialogChange(e, "id")}>
          <DialogTrigger
            title="delete"
            className="w-fit py-1 px-2 hover:bg-secondary text-primary grid place-content-center"
          >
            <IoIosAddCircle className="text-3xl hover:cursor-pointer" />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={(e: any) => handleAdd(e)}>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="course-name" />
                  <Input
                    id="course-name"
                    type="text"
                    name="courseName"
                    placeholder="course name"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="description" />
                  <Input
                    id="description"
                    type="text"
                    placeholder="description"
                    name="description"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="duration" />
                  <Input
                    id="duration"
                    type="text"
                    placeholder="duration"
                    name="duration"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="credits" />
                  <Input
                    id="credits"
                    type="text"
                    placeholder="credits"
                    name="credits"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <DialogFooter className="mt-5">
                <DialogClose>
                  <Button
                    variant={"secondary"}
                    className="text-sm hover:bg-secondary"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <div>
                  <AddBtn
                    isSubmitting={isSubmitting}
                    title={`add`}
                    className="text-sm"
                  />
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateCourse;
