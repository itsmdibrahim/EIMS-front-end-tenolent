import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:px-0 px-5",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <Link
          key={i}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === item.href
              ? "bg-secondary hover:bg-secondary"
              : "hover:bg-transparent hover:underline",
            "justify-start capitalize text-primary lg:text-sm text-[9px]"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
