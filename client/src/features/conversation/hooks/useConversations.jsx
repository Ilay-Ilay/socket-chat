import { useQuery } from "@tanstack/react-query";
import getConversations from "../utils/getConversations";
import { useAuth } from "@clerk/react";

function useConversations() {
  const { getToken } = useAuth();
  return useQuery({
    queryFn: () => getConversations(getToken),
    queryKey: ["conversations"],
  });
}

export default useConversations;
