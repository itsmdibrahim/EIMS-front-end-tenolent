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
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const location = useLocation(); // Access the current URL
  const { code, email } = location.state || {}; // Get userId from state

  const [showError, setShowError] = useState<any>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendData, setSendData] = useState({});
  const navigate = useNavigate();

  function handleChange(e: any) {
    setShowError(false);
    setSendData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleLogin(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    // POST request using fetch()

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/password-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...sendData, code, email }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        if (data.message == "Password Updated") {
          navigate("/auth/login");
        } else {
          throw new Error(`something was wrong!`);
        }

        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error:", error);

        setShowError(true);
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Reset <br /> Your Password
        </CardTitle>
        <CardDescription>
          Enter your new password below and submit. Please try to change your
          password within 1 minute after you verify the reset code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="password"
                required
                onChange={handleChange}
              />

              {showError && (
                <div>
                  <ShowAlert
                    variant={`destructive`}
                    title={`Invalid Code or Email or Server Error.`}
                    alert={`Error`}
                  />
                </div>
              )}
            </div>

            <AddBtn
              title="Submit"
              isSubmitting={isSubmitting}
              className={`w-full`}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ResetPassword;
