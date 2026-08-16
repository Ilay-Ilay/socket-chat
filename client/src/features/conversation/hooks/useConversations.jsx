import { useQuery } from "@tanstack/react-query";
import getConversations from "../utils/getConversations";

function useConversations() {
  return useQuery({
    queryFn: getConversations(),
    queryKey: ["conversations"],
  });
}

export default useConversations;
