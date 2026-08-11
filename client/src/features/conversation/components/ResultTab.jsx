function ResultTab({ user }) {
  return (
    <div>
      <div>
        <img
          className="h-8 w-8 rounded-full"
          src={user.avatar}
          alt={`${user.username || user.firstName} avatar`}
        />
      </div>
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.username}</p>
      </div>
    </div>
  );
}

export default ResultTab;
