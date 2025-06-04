import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { login } from "../../services/userService";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./LoginPage.scss";
import { useRef, useState } from "react";
import { validateEmail } from "../../../utils/emailValidate";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/userSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mailFilled, setMailFilled] = useState(true);
  const [mailValid, setMailValid] = useState(true);
  const [passwordFilled, setPasswordFilled] = useState(true);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = validateEmail(data.email);
    setMailValid(emailValid);
    setMailFilled(!!data.email);
    setPasswordFilled(!!data.password);
    if (!data.email || !data.password || !emailValid) return;

    const res = await login(data);
    if (res.status === "succesfull") {
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      dispatch(setUser(res.user));
      formRef.current.reset();
    } else {
      toast.warning(res.message);
    }
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <div className="login-container">
      <form ref={formRef} className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-label">LOGIN</h2>

        <Label htmlFor="email" className="input-label">
          {mailFilled
            ? mailValid
              ? "EMAIL"
              : "EMAIL IS NOT VALID"
            : "EMAIL IS REQUIRED"}
        </Label>

        <Input
          id="email"
          className="login-input"
          placeholder="Enter your email"
          type="text"
          onChange={handleInputChange}
        />

        <Label htmlFor="password" className="input-label">
          {passwordFilled ? "PASSWORD" : "PASSWORD IS REQUIRED"}
        </Label>

        <Input
          id="password"
          className="login-input password-input"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          onChange={handleInputChange}
        />

        {!showPassword ? (
          <FaRegEyeSlash
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
        ) : (
          <FaRegEye
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
        )}

        <Button className="login-button">LOGIN</Button>
      </form>
    </div>
  );
};

export default LoginPage;
