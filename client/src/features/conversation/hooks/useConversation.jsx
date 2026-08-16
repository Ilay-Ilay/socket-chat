import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useAuth } from "@clerk/react";
import UIContext from "../../../context/UIContext";
import getConversation from "../utils/getConversation";

function useConversation() {
  const { recipient } = useContext(UIContext);
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["conversation", recipient?.clerkId],

    queryFn: () => getConversation(recipient.clerkId, getToken),

    enabled: !!recipient,
  });
}

export default useConversation;
