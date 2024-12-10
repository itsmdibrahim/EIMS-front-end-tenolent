import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";

function AddBtn({ title, isSubmitting, onClick, className, type }: any) {
  return (
    <Button
      {...(onClick ? { onClick: onClick } : {})}
      type={type ? type : "submit"}
      className={cn("relative lg:w-full w-fit lg:ml-none ml-auto", className)}
      disabled={isSubmitting}
    >
      {isSubmitting && <LucideLoader2 className="animate-spin" />}
      <span>{title}</span>
    </Button>
  );
}

export default AddBtn;
