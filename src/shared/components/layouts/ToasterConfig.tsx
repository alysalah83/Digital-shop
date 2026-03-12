import { Toaster } from "react-hot-toast";

function ToasterConfig() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#eff6ff",
          color: "#162456",
        },
        success: {
          duration: 3000,
        },
      }}
    />
  );
}

export default ToasterConfig;
