import { useEffect, useState } from "react";
import "./Toast.css";

function Toast({ message, type = "success", onClose }) {

  const [show, setShow] = useState(false);

  useEffect(() => {

    if (!message) {
      return;
    }

    setShow(true);

    const timer = setTimeout(() => {

      setShow(false);

      setTimeout(() => {
        onClose();
      }, 400);

    }, 3000);

    return () => clearTimeout(timer);

  }, [message]);


  if (!message) {
    return null;
  }


  return (
    <div className={`custom-toast ${type} ${show ? "show" : ""}`}>

      <div className="toast-icon">

        {type === "success" && "✓"}
        {type === "error" && "!"}
        {type === "warning" && "!"}
        {type === "info" && "i"}

      </div>


      <div className="toast-content">

        <div className="toast-title">

          {type === "success" && "Success"}
          {type === "error" && "Error"}
          {type === "warning" && "Warning"}
          {type === "info" && "Information"}

        </div>

        <div className="toast-message">
          {message}
        </div>

      </div>


      <button
        className="toast-close"
        onClick={() => {

          setShow(false);

          setTimeout(() => {
            onClose();
          }, 400);

        }}
      >
        ×
      </button>


      <div className="toast-progress"></div>

    </div>
  );
}
export default Toast;