import { SidebarNav } from "@/components/home-page/sidebar-nav";
import { settingsSidebarNavItems } from "@/consts";
import { Separator } from "@radix-ui/react-separator";
import { Outlet, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WebsiteHeader from "@/common/website-header";
import { FaCircleUser } from "react-icons/fa6";
import { Toaster } from "@/components/ui/toaster";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import HighlightTitle from "@/common/highlight-title";

function SettingsPage() {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  function handleLogOut() {
    Cookies.set(import.meta.env.VITE_AUTH_TOKEN_KEY, "");
    Cookies.set(import.meta.env.VITE_AUTH_USER_DATA, "");

    navigate("/auth");
  }

  useEffect(() => {
    let userInfo = JSON.parse(
      Cookies.get(import.meta.env.VITE_AUTH_USER_DATA) != undefined ||
        Cookies.get(import.meta.env.VITE_AUTH_USER_DATA) != null
        ? Cookies.get(import.meta.env.VITE_AUTH_USER_DATA)!
        : ``
    );
    setUserData(userInfo);
  }, []);

  return (
    <div>
      <div className="container mx-auto lg:py-2 py-2">
        <div className="lg:px-0 px-5">
          <WebsiteHeader />
        </div>

        <Separator className="lg:my-6 my-2 bg-secondary h-[1px]" />

        <div className="lg:px-0 px-5 flex justify-between items-center">
          <div className="lg:w-full flex justify-end items-center order-2">
            <div className="flex max-w-[200px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <FaCircleUser className="text-2xl cursor-pointer" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 mr-4">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs leading-none text-muted-foreground">
                        {userData ? userData.email : `email@example.com`}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-primary">Settings</span>
                      <DropdownMenuShortcut>
                        <IoIosSettings className="text-xl mr-[0.2rem]" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <Dialog>
                      <DialogTrigger className="w-full py-1 px-2 hover:bg-secondary text-primary">
                        <div className="flex items-center justify-between w-full text-sm">
                          <span>Logout</span>
                          <IoLogOutOutline className="text-xl transition-colors" />
                        </div>
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

                          <Button
                            className="text-sm"
                            onClick={() => handleLogOut()}
                          >
                            Logout
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <HighlightTitle
            title={`Settings`}
            subTitle={`Manage your account settings.`}
          />
        </div>

        <Separator className="lg:my-6 my-2 bg-secondary h-[1px]" />

        <div className="flex flex-col lg:flex-row w-full h-full">
          <aside className="-px-4 lg:w-1/5">
            <SidebarNav
              items={settingsSidebarNavItems}
              className="sticky top-5"
            />
          </aside>
          <div className="w-full">
            {userData && <Outlet context={{ userData }} />}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SettingsPage;
