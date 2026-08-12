import Chat from "../components/Chat";
import Conversations from "../components/Conversations";

function Conversation() {
  return (
    <div className="flex ">
      <Conversations />
      <Chat />
    </div>
  );
}

export default Conversation;
