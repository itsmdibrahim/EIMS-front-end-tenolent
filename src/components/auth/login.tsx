import AddBtn from "@/common/add-btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthenticate from "@/hooks/use-authenticate";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setCookie] = useAuthenticate();
  const [sendData, setSendData] = useState({});

  function handleChange(e: any, key: string) {
    setSendData((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function handleLogin(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    // POST request using fetch()

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data: any) => {
        if (data.message) {
          if (data.message != "Invalid Credentials") {
            setCookie(data);
          } else {
            alert(data.message);
          }
        } else {
          setCookie(data);
        }

        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error:", error);
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
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
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                onChange={(e) => {
                  handleChange(e, `password`);
                }}
                id="password"
                type="password"
                required
              />
            </div>

            <AddBtn
              title="Login"
              isSubmitting={isSubmitting}
              className={`w-full`}
            />
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
