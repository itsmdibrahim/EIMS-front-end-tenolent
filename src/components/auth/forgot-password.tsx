import AddBtn from "@/common/add-btn";
import ShowAlert from "@/common/show-alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [showError, setShowError] = useState<any>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendData, setSendData] = useState<any>({});
  const navigate = useNavigate();

  function handleChange(e: any) {
    setShowError(false);
    setSendData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleLogin(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    // POST request using fetch()

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data: any) => {
        if (data.message == "Invalid Email") {
          setShowError(true);
        } else if (data.message == "Sent Code") {
          navigate(`/auth/varification`, {
            state: {
              email: `${sendData.email ? sendData.email : ``}`,
              recent: true,
            },
          });
        } else {
          throw new Error(`something was wrong!`);
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
        <CardTitle className="text-2xl">
          Forgot <br /> Your Password?
        </CardTitle>
        <CardDescription>
          Enter your email below to reset password
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
                name="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
              />

              {showError && (
                <div>
                  <ShowAlert
                    variant={`destructive`}
                    title={`Invalid Email`}
                    alert={`Error`}
                  />
                </div>
              )}
            </div>

            <AddBtn
              title="Reset Password"
              isSubmitting={isSubmitting}
              className={`w-full`}
            />
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Back to login?{" "}
          <Link to="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ForgotPassword;
