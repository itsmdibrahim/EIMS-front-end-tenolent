import HighlightTitle from "@/common/highlight-title";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AddBtn from "@/common/add-btn";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
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

function ProfileSettings() {
  let [userData, setUserData] = useState<any>(getCookie());

  function getCookie() {
    return JSON.parse(
      Cookies.get(import.meta.env.VITE_AUTH_USER_DATA) != undefined ||
        Cookies.get(import.meta.env.VITE_AUTH_USER_DATA) != null
        ? Cookies.get(import.meta.env.VITE_AUTH_USER_DATA)!
        : ``
    );
  }

  const [sendData, setSendData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState<any>(null);

  const { toast } = useToast();

  function handleSubmit(e: any) {
    e.preventDefault();

    setIsSubmitting(true);
    // PUT request using fetch()
    fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/profile/update/${userData.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(sendData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
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
        title={`Profile`}
        subTitle={`You can change your name from here.`}
      />

      <Separator className="lg:my-6 my-2 bg-secondary h-[1px]" />

      <form
        className="lg:max-w-[220px] w-full grid gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <Label htmlFor={`name`} className="capitalize">
            name
          </Label>
          <Input
            id={`name`}
            name="name"
            type="text"
            placeholder={userData.name ? userData.name : ``}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor={`contact`} className="capitalize">
            contact
          </Label>
          <Input
            id={`contact`}
            name="contact"
            type="text"
            placeholder={userData.contact ? userData.contact : ``}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor={`address`} className="capitalize">
            address
          </Label>
          <Input
            id={`address`}
            name="address"
            type="text"
            placeholder={userData.address ? userData.address : ``}
            onChange={handleChange}
          />
        </div>

        <div className="w-fit">
          <AddBtn title={`Submit`} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
}

export default ProfileSettings;
