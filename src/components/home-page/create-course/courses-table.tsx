import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GrSchedule } from "react-icons/gr";

import { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import ShowAlert from "../../../common/show-alert";
import PreLoader from "../../../common/pre-loader";
import AddBtn from "@/common/add-btn";
import { IoIosAddCircle } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Sending data using fetch
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

const CoursesTable = ({
  tableHead,
  showData,
  isDataLoading,
  setShowData,
  tableContainer,
}: any) => {
  const preloaderRef = useRef<any>(null);

  // Sample data for the table with ISO date strings
  const [data, setData] = useState<any>(showData);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [delId, setDelId] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<any>(null);
  const [sendData, setSendData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState<any>(null);

  const { toast } = useToast();

  function handleDelete() {
    setIsDeleting(true);

    if (token) {
      headers[import.meta.env.VITE_AUTH_TOKEN_KEY] = token;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/delete/user/${delId}`, {
      method: "DELETE",
      headers,
    })
      .then((res) => {
        if (res.ok) {
          setIsOpen(false);
          toast({
            title: "Deleted",
            description: "Data deleted successfully!",
          });

          setData((prev: any) => {
            return [...prev.filter((item: any) => item._id !== delId)];
          });

          if (setShowData) {
            setShowData((prev: any) => {
              return [...prev.filter((item: any) => item._id !== delId)];
            });
          }

          setIsDeleting(false);
        }
      })
      .catch((err: any) => {
        console.log(err);

        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        setIsDeleting(false);
      });
  }

  const handleDialogChange = (open: boolean, e: any) => {
    setIsOpen(open);

    if (open) {
      setDelId(e);
    } else {
      setDelId("null");
    }
  };

  function handleChange(e: any) {
    setSendData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAdd(e: any) {
    e.preventDefault();
    setIsSubmitting(true);

    const url = `${import.meta.env.VITE_API_URL}/api/course/files/update`; // Replace with your API URL

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      window.location.reload();
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error fetching data:", error);

      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setData(showData);

    console.log(showData);

    if (isDataLoading) {
      preloaderRef && preloaderRef.current.classList.remove("hidden");
    } else {
      preloaderRef && preloaderRef.current.classList.add("hidden");
    }
  }, [showData, isDataLoading]);

  return (
    <>
      <div
        ref={preloaderRef}
        className="w-full h-full absolute top-0 left-0 z-50"
      >
        <PreLoader />
      </div>
      {data && (
        <div
          {...(tableContainer ? { ref: tableContainer } : {})}
          className="container mx-auto h-[300px] overflow-x-hidden relative"
        >
          <div className="sticky top-0 z-10">
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  {tableHead &&
                    tableHead.map((th: any, i: any) => {
                      if (i == 0) {
                        return (
                          <TableHead
                            key={i}
                            className="lg:text-sm text-[9px] lg:h-10 h-2"
                          >
                            {/* Date & Time */}
                            {th}
                          </TableHead>
                        );
                      }
                      if (i > 0 && i + 1 < tableHead.length) {
                        return (
                          <TableHead
                            key={i}
                            className="lg:text-sm text-[9px] lg:h-10 h-2 lg:text-left text-right"
                          >
                            {/* Date & Time */}
                            {th}
                          </TableHead>
                        );
                      }
                      if (i + 1 == tableHead.length) {
                        return (
                          <TableHead
                            key={i}
                            className="lg:text-sm text-[9px] lg:h-10 h-2 text-right"
                          >
                            {/* Date & Time */}
                            {th}
                          </TableHead>
                        );
                      }
                    })}
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          <Table>
            <TableBody>
              {data.map((row: any, index: any) => (
                <TableRow key={index} className="grid grid-cols-3 gap-2">
                  <TableCell className="w-auto truncate lg:p-4 p-1 lg:text-base text-[9px]">
                    {row.courseName}
                  </TableCell>
                  <TableCell className="lg:p-4 p-1 lg:text-base text-xs">
                    <div className="w-full flex gap-2 items-center justify-start">
                      <span className="text-light-black">
                        {row.description && `description: ${row.description}`}{" "}
                        <br />
                        {row.duration && `duration: ${row.duration}`} <br />
                        {row.credits && `description: ${row.credits}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="lg:p-4 p-1 lg:text-base text-xs">
                    <div className="flex lg:flex-row flex-col gap-2 items-center justify-center">
                      <Dialog
                        open={isOpen}
                        onOpenChange={(e) => handleDialogChange(e, row._id)}
                      >
                        <DialogTrigger
                          title="delete"
                          className="w-fit p-2 hover:bg-secondary text-primary grid place-content-center"
                        >
                          <RiDeleteBin6Fill className="hover:cursor-pointer" />
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
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
                                isSubmitting={isDeleting}
                                title={`Delete`}
                                className="text-sm"
                                onClick={() => handleDelete()}
                              />
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isOpen}
                        onOpenChange={(e) => handleDialogChange(e, "id")}
                      >
                        <DialogTrigger
                          title="delete"
                          className="w-fit p-2 hover:bg-secondary text-primary grid place-content-center"
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
                                <Label htmlFor="url" />
                                <Input
                                  id="url"
                                  type="text"
                                  name="url"
                                  placeholder="url"
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <Label htmlFor="type" />
                                <Input
                                  id="type"
                                  type="text"
                                  placeholder="type"
                                  name="type"
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

                      <Button title="assign schedule" variant={`ghost`}>
                        <GrSchedule />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data && data.length == 0 && <ShowAlert title={`No data found.`} />}
        </div>
      )}
    </>
  );
};

export default CoursesTable;
