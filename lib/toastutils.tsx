import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import type React from "react"; // Added import for React

type ToastType = "success" | "error";

interface ShowToastOptions {
  type: ToastType;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const useShowToast = () => {
  const { toast } = useToast();

  const showToast = ({ type, title, description, action }: ShowToastOptions) => {
    toast({
      variant: type === "error" ? "destructive" : type,
      title,
      description,
      action: action ? <ToastAction altText="Action">{action}</ToastAction> : undefined,
    });
  };

  return showToast;
};

// how to use it
// const showToast = useShowToast();
// showToast({
//   type: "success",
//   title: "Success!",
//   description: "Your action was completed successfully.",
// });
// showToast({
//   type: "error",
//   title: "Uh oh! Something went wrong.",
//   description: "There was a problem with your request.",
//   action: "Try again",
// });
