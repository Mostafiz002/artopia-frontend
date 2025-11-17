import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/route.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import ReactLenis from "lenis/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.1 }}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            duration: 3000,
          }}
        />
      </AuthProvider>
    </ReactLenis>
  </StrictMode>
);
