import "./Input.scss";
const Input = ({ id, placeholder, type, onChange, required }) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      required={required}
    />
  );
};
export default Input;
