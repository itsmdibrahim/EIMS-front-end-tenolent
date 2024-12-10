import { ComponentType } from "react";

export interface InputArrayItem {
  shadcnComponent: ComponentType; // React component, e.g., Input from shadcn
  type?: string; // Input type (e.g., "text", "number", etc.)
  htmlFor: string; // The `for` attribute of the label
  labelTx: string; // The label text
  placeholder?: string; // Placeholder for the input field (optional)
  classNames?: string; // Optional CSS class names
  objKey: string; // Object key for tracking data (e.g., "spendAmount")
}
