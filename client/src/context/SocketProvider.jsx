import { useEffect } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useAuth } from "@clerk/react";

function SocketProvider({ children }) {
  const socket = useRef(null);
  const { getToken } = useAuth();

  useEffect(() => {
    async function connectSocket() {
      const token = await getToken();

      socket.current = io(import.meta.env.VITE_API_URL, {
        auth: {
          token,
        },
      });
    }

    connectSocket();

    return () => {
      socket.current?.disconnect();
    };
  }, [getToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
