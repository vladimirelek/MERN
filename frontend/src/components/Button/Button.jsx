import "./Button.scss";
const Button = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};
export default Button;
