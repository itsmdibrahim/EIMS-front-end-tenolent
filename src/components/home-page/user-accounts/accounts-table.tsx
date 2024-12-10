import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PiBowlSteamFill } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";

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
import AddBtn from "../../../common/add-btn";
import ShowAlert from "../../../common/show-alert";
import PreLoader from "../../../common/pre-loader";

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

const AccountsTable = ({
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

  function handleFacultyUpdate(e: any, type: any, userId: any) {
    e.target.setAttribute("disabled", "true");
    e.target
      .closest(".load-container")
      .querySelector(".spinner")
      .classList.remove("hidden");

    // PUT request using fetch()
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/auth/faculty-status-update/${userId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ isFaculty: type == "faculty" ? true : false }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);

        setData((prev: any) => {
          return [
            ...prev.map((item: any) => {
              if (item._id == res.data._id) {
                return res.data;
              } else {
                return item;
              }
            }),
          ];
        });

        toast({
          title: "Update.",
          description: "user updated successfully!",
        });

        e.target
          .closest(".load-container")
          .querySelector(".spinner")
          .classList.add("hidden");
        e.target.removeAttribute("disabled", "true");
      })
      .catch((err) => {
        console.log(err);

        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        e.target
          .closest(".load-container")
          .querySelector(".spinner")
          .classList.add("hidden");
        e.target.removeAttribute("disabled", "true");
      });
  }

  function handleAssignCourses(e: any) {
    console.log(e);
  }

  const handleDialogChange = (open: boolean, e: any) => {
    setIsOpen(open);

    if (open) {
      setDelId(e);
    } else {
      setDelId("null");
    }
  };

  useEffect(() => {
    setData(showData);

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
                    {row.email}
                  </TableCell>
                  <TableCell className="lg:p-4 p-1 lg:text-base text-xs">
                    <div className="w-full flex gap-2 items-center justify-start">
                      <span className="text-light-black">{row.userType}</span>
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
                          className="w-fit py-1 px-2 hover:bg-secondary text-primary grid place-content-center"
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

                      <div className="load-container relative">
                        <Button
                          title="make faculty"
                          variant={`ghost`}
                          className={`capitalize ${
                            row.userType == "faculty" ? `bg-theme-active` : ``
                          }`}
                          onClick={(e: any) => {
                            handleFacultyUpdate(e, row.userType, row._id);
                          }}
                        >
                          <PiBowlSteamFill />
                        </Button>

                        <AiOutlineLoading3Quarters className="spinner hidden text-primary text-sm animate-spin absolute top-1/3 left-1/3 -tranalate-x-1/2 -tranalate-y-1/2" />
                      </div>

                      <div className="load-container relative">
                        <Button
                          title="assign courses"
                          variant={`ghost`}
                          className={`capitalize ${
                            row.courses.length > 0 ? `bg-theme-active` : ``
                          }`}
                          onClick={(e: any) => {
                            handleAssignCourses(e);
                          }}
                        >
                          <MdAssignmentAdd />
                          {row.courses.length > 0
                            ? ` ${row.courses.length}`
                            : ``}
                        </Button>

                        <AiOutlineLoading3Quarters className="spinner hidden text-primary text-sm animate-spin absolute top-1/3 left-1/3 -tranalate-x-1/2 -tranalate-y-1/2" />
                      </div>
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

export default AccountsTable;
