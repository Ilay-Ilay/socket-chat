import { useState } from "react";
import UIContext from "./UIContext";

function UIProvider({ children }) {
  const [recipient, setRecipient] = useState(null);

  return (
    <UIContext.Provider value={{ recipient, setRecipient }}>
      {children}
    </UIContext.Provider>
  );
}

export default UIProvider;
