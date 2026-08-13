import { useContext } from "react";
import UIContext from "../../../context/UIContext";
import useConversation from "../hooks/useConversation";
import Spinner from "../../../components/Spinner";
import ChatInput from "./ChatInput";

function Chat() {
  const { selectedUser } = useContext(UIContext);

  const { data: conversation, isLoading } = useConversation();

  if (!selectedUser) {
    return (
      <main className="flex items-center justify-center flex-1">
        <p className="text-gray-500">Select a chat</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex items-center justify-center flex-1">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-1 relative p-8 justify-between">
      <div>
        {conversation?.messages?.length > 0 ? (
          <div className="flex items-center justify-center w-full">
            <p>Messages</p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <p>No messages here yet</p>
          </div>
        )}
      </div>
      <ChatInput />
    </main>
  );
}

export default Chat;
