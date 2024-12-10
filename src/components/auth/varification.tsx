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

function Varification() {
  const location = useLocation(); // Access the current URL
  const { recent, email } = location.state || {}; // Get userId from state

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

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...sendData, email }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        if (data.message == "Code Matched") {
          navigate(`/auth/reset-password`, {
            state: { code: `${sendData.code ? sendData.code : ``}`, email },
          });
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
          Verify <br /> Your Code
        </CardTitle>
        {recent && (
          <CardDescription className="text-light-notify">
            Enter your verification code below that we have just sent to your
            email.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                type="text"
                name="code"
                placeholder="code"
                required
                onChange={handleChange}
              />

              {showError && (
                <div>
                  <ShowAlert
                    variant={`destructive`}
                    title={`Invalid Code or Email or Server Error`}
                    alert={`Error`}
                  />
                </div>
              )}
            </div>

            <AddBtn
              title="Verify"
              isSubmitting={isSubmitting}
              className={`w-full`}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default Varification;
