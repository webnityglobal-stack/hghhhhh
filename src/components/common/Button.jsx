function Button({ children, color = "blue", onClick }) {
  const buttonStyle = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonStyle[color]} text-white px-6 py-3 rounded-lg font-semibold transition`}
    >
      {children}
    </button>
  );
}

export default Button;