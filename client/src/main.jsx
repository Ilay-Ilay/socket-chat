import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkKey}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ClerkProvider>,
);
