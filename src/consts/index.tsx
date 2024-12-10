import { InputArrayItem } from "@/interfaces";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const inputArray: InputArrayItem[] = [
  {
    shadcnComponent: Input,
    type: "text",
    htmlFor: "amount",
    labelTx: "Amount",
    placeholder: "Spend Amount",
    objKey: "amount",
  },
  {
    shadcnComponent: Textarea,
    htmlFor: "topic",
    labelTx: "Topic",
    placeholder: "Type your spend topic here.",
    objKey: "topic",
  },
];
export const sidebarNavItems: any = {
  student: [
    {
      title: "available courses",
      href: "/available-courses",
    },
    {
      title: "my courses",
      href: "/my-courses",
    },
  ],
  faculty: [
    {
      title: "create course",
      href: "/create-course",
    },
  ],
  admin: [
    {
      title: "user accounts",
      href: "/user-accounts",
    },
    {
      title: "create course",
      href: "/create-course",
    },
  ],
};
export const settingsSidebarNavItems = [
  {
    title: "profile",
    href: "/settings/profile",
  },
  {
    title: "account",
    href: "/settings/account",
  },
];
export const baseKeys = ["fare", "spends", "income"];
export const userAccountTableHead = ["email", "role", "actions"];
export const coursesTableHead = ["course name", "details", "actions"];
