import Spinner from "../../../components/Spinner";
import useConversations from "../hooks/useConversations";

function Conversations() {
  const { data, isLoading } = useConversations();
  console.log(data);
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );

  return <div>Conversations: </div>;
}

export default Conversations;
