import { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

function ToastProvider({ children }) {

  const [toast, setToast] = useState({
    message: "",
    type: "success"
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type
    });
  };

  const closeToast = () => {
    setToast({
      message: "",
      type: "success"
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  );
}

function useToast() {
  return useContext(ToastContext);
}

export { ToastProvider, useToast };