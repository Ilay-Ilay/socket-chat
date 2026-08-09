import { useAuth } from "@clerk/react";

import { Navigate, Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Public() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/conversations" replace />;
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
