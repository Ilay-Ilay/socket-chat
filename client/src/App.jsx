import { ClerkProvider } from "@clerk/react";
import Router from "./router/router";

function App() {
  return (
    <ClerkProvider>
      <Router />
    </ClerkProvider>
  );
}

export default App;
