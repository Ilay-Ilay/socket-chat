function ResultTab({ user }) {
  return (
    <div className="hover:bg-gray-200 rounded-md">
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
