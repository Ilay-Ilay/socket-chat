import { useContext } from "react";
import UIContext from "../../../context/UIContext";

function ConversationTab({ data }) {
  const { recipient, lastMessage } = data;
  const { recipient: selectedRecipient, setRecipient } = useContext(UIContext);
  console.log(recipient);

  const lastMessageDate = new Date(lastMessage.createdAt);
  const today = new Date();
  const isToday =
    today.getFullYear() === lastMessageDate.getFullYear() &&
    today.getMonth() === lastMessageDate.getMonth() &&
    today.getDate() === lastMessageDate.getDate();

  const time = `${lastMessageDate.getHours()}:${String(
    lastMessageDate.getMinutes(),
  ).padStart(2, "0")}`;
  const date = `${String(lastMessageDate.getDate()).padStart(2, "0")}.${String(
    lastMessageDate.getMonth() + 1,
  ).padStart(2, "0")}.${String(lastMessageDate.getFullYear()).slice(-2)}`;

  return (
    <div
      onClick={() => setRecipient(recipient)}
      className={`p-2 rounded-md hover:bg-gray-100 ${
        selectedRecipient?.clerkId === recipient.clerkId
          ? "bg-gray-100"
          : "bg-white"
      }`}
    >
      <div className="flex gap-2">
        <img src={recipient.avatar} alt="" className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <div className="flex justify-between items-center w-full">
            <p>{recipient.username}</p>
            <p className="text-sm text-gray-500">{isToday ? time : date}</p>
          </div>
          <p className=" text-sm text-gray-500">{lastMessage.content}</p>
        </div>
      </div>
    </div>
  );
}

export default ConversationTab;
