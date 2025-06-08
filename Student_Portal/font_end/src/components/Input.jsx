const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded outline-blue-600"
        required
      />
    </div>
  );
};

export default Input;
