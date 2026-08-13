import SocketProvider from "../../../context/SocketProvider";
import Chat from "../components/Chat";
import Conversations from "../components/Conversations";

function Conversation() {
  return (
    <SocketProvider>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Conversations />

        <Chat />
      </div>
    </SocketProvider>
  );
}

export default Conversation;
