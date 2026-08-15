import { useContext } from "react";
import { useState } from "react";
import UIContext from "../../../context/UIContext";
import { SocketContext } from "../../../context/SocketContext";

function ChatInput() {
  const [message, setMessage] = useState("");
  const { selectedUser } = useContext(UIContext);
  const { socket } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    if (!message.trim()) return;

    socket.emit("sendMessage", {
      recipientId: selectedUser._id,
      content: message,
    });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />

      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
