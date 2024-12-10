import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";

function ShowAlert({ alert, title, variant }: any) {
  return (
    <Alert
      {...(alert ? { alert } : { alert: `Heads up!` })}
      {...(variant ? { variant } : {})}
      className="mt-1"
    >
      {variant && variant == "destructive" ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <Terminal className="h-4 w-4" />
      )}

      <AlertTitle className="text-light-black">{alert}</AlertTitle>
      <AlertDescription className="text-primary">{title}</AlertDescription>
    </Alert>
  );
}

export default ShowAlert;
