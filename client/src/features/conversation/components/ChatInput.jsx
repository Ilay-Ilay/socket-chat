import { useState } from "react";

function ChatInput() {
  const [message, setMessage] = useState("");

  return (
    <input
      className="p-4 rounded-full border border-gray-300  bg-white w-full"
      placeholder="Write a message..."
    />
  );
}

export default ChatInput;
