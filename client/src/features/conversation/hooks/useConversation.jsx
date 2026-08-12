import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useAuth } from "@clerk/react";
import UIContext from "../../../context/UIContext";
import getConversation from "../utils/getConversation";

function useConversation() {
  const { selectedUser } = useContext(UIContext);
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["conversation", selectedUser?._id],

    queryFn: () => getConversation(selectedUser._id, getToken),

    enabled: !!selectedUser,
  });
}

export default useConversation;
