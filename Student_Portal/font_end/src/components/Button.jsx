const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white py-2 px-4 rounded transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
