import { useContext } from "react";
import UIContext from "../../../context/UIContext";

function ResultTab({ user }) {
  const { selectedUser, setSelectedUser } = useContext(UIContext);

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`${user._id === selectedUser._id ? "bg-gray-100" : ""} "hover:bg-gray-200 rounded-md pointer-events-none cursor-pointer`}
    >
      <div className="flex gap-1">
        <div>
          <img
            className="h-8 w-8 rounded-full"
            src={user.avatar}
            alt={`${user.username || user.firstName} avatar`}
          />
        </div>
        <div>
          <p className="text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-600">{user.username}</p>
        </div>
      </div>
    </div>
  );
}

export default ResultTab;
