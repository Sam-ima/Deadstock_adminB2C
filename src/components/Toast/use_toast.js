import { useToastContext } from "./toast_provider";

export const useToast = () => {
  const context = useToastContext();

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};
