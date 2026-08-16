import { useAuth } from "@clerk/react";

function Message({ message }) {
  const { userId } = useAuth();
  const isSentByMe = message.senderId === userId;

  return (
    <div className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`py-2 px-4 rounded-2xl ${
          isSentByMe ? "bg-gray-300 rounded-tr-sm" : "bg-gray-200 rounded-tl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default Message;
