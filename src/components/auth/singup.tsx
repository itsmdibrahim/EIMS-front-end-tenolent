import AddBtn from "@/common/add-btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthenticate from "@/hooks/use-authenticate";
import ShowAlert from "@/common/show-alert";

export function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendData, setSendData] = useState({});
  const [showError, setShowError] = useState<any>(false);
  const [setCookie] = useAuthenticate();

  function handleChange(e: any, key: string) {
    setShowError(false);
    setSendData((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function handleSignUp(e: any) {
    e.preventDefault();

    setIsSubmitting(true);
    // POST request using fetch()
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((res: any) => {
        if (res.status == 409) {
          setShowError(true);
          throw new Error(`Email Exists!`);
        } else {
          return res.json();
        }
      })
      .then((data: any) => {
        setCookie(data);

        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert(error);
        console.error("Error:", error);
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e: any) => handleSignUp(e)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  handleChange(e, `email`);
                }}
              />
              {showError && (
                <div>
                  <ShowAlert
                    variant={`destructive`}
                    title={`Email Exists!`}
                    alert={`Error`}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => {
                  handleChange(e, `password`);
                }}
              />
            </div>

            <AddBtn title="Create an account" isSubmitting={isSubmitting} />
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
