import HighlightTitle from "@/common/highlight-title";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AddBtn from "@/common/add-btn";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import ShowAlert from "@/common/show-alert";
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

function AccountSettings() {
  let userData = JSON.parse(
    Cookies.get(import.meta.env.VITE_AUTH_USER_DATA) != undefined ||
      Cookies.get(import.meta.env.VITE_AUTH_USER_DATA) != null
      ? Cookies.get(import.meta.env.VITE_AUTH_USER_DATA)!
      : ``
  );

  const [sendData, setSendData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState<any>(null);
  const [showError, setShowError] = useState<any>(false);

  const { toast } = useToast();

  function handleSubmit(e: any) {
    e.preventDefault();

    setIsSubmitting(true);
    // POST request using fetch()
    fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/account/update/${userData.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(sendData),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "Invalid Credentials") {
          setShowError(true);
        } else {
          toast({
            title: "Update.",
            description: "Password updated successfully!",
          });
        }
        setSendData({});
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);

        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        setIsSubmitting(false);
      });
  }
  function handleChange(e: any) {
    setSendData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="relative lg:px-10 px-5 h-full pt-5">
      <HighlightTitle
        title={`Account`}
        subTitle={`You can change your password from here.`}
      />

      <Separator className="lg:my-6 my-2 bg-secondary h-[1px]" />

      <form
        className="lg:max-w-[220px] w-full grid gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <Label htmlFor={`old-password`} className="capitalize">
            old password
          </Label>
          <Input
            id={`old-password`}
            name="oldPassword"
            type="password"
            placeholder={`old password`}
            onChange={(e) => {
              setShowError(false);
              handleChange(e);
            }}
            {...(sendData[`oldPassword`]
              ? { value: sendData[`oldPassword`] }
              : { value: `` })}
          />
          {showError && (
            <div className="w-auto">
              <ShowAlert
                alert={`Error`}
                variant={`destructive`}
                title={`Invalid Credentials`}
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor={`password`} className="capitalize">
            new password
          </Label>
          <Input
            id={`password`}
            name="password"
            type="password"
            placeholder={`password`}
            onChange={handleChange}
            {...(sendData[`password`]
              ? { value: sendData[`password`] }
              : { value: `` })}
          />
        </div>

        <div className="w-fit">
          <AddBtn title={`Submit`} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
}

export default AccountSettings;
