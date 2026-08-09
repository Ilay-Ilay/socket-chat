function Button({ label, ...props }) {
  return (
    <button {...props} className="p-2 border border-gray-300 rounded-md">
      {label}
    </button>
  );
}

export default Button;
