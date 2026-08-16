import SocketProvider from "../../../context/SocketProvider";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

function Conversation() {
  return (
    <SocketProvider>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </SocketProvider>
  );
}

export default Conversation;
