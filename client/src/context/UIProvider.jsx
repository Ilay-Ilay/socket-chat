import { useState } from "react";
import UIContext from "./UIContext";

function UIProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UIContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UIContext.Provider>
  );
}

export default UIProvider;
