const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-orange-400 hover:bg-orange-500 hover:cursor-pointer text-white py-2 px-4 rounded transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
