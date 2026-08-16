import { useContext } from "react";
import { useState } from "react";
import UIContext from "../../../context/UIContext";
import { SocketContext } from "../../../context/SocketContext";

function ChatInput() {
  const [message, setMessage] = useState("");
  const { recipient } = useContext(UIContext);
  const { socket } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!socket.current) return;
    if (!recipient) return;
    console.log(recipient.clerkId);
    socket.current.emit("sendMessage", {
      recipientId: recipient.clerkId,
      content: message,
    });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
        className="p-4 border border-gray-300 rounded-full full w-full"
      />

      <button className="p-4 bg-stone-900 text-white" type="submit">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
