interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
}
const Input = ({
  label,
  error,
  className = "",
  required = false,
  ...props
}: InputProps) => {
  const inputClasses = `
    block w-full px-3 py-2 border border-gray-300 rounded-lg 
    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
    focus:border-blue-500 transition-colors
    ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
    ${className}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
