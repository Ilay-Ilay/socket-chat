import Spinner from "../../../components/Spinner";
import useConversations from "../hooks/useConversations";
import ConversationTab from "./ConversationTab";

function Conversations() {
  const { data: conversations, isLoading } = useConversations();
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-4">
      {conversations.map((aggregatedData) => (
        <ConversationTab data={aggregatedData} key={aggregatedData._id} />
      ))}
    </div>
  );
}

export default Conversations;
