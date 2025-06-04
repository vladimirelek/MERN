import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { validateEmail } from "../../../utils/emailValidate";
import { register } from "../../services/userService";
import { useSelector, useDispatch } from "react-redux";
import { setShowLoader } from "../../store/loader/loaderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import "./RegisterPage.scss";

const RegisterPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validMail, setValidMail] = useState(true);
  const [filledMail, setFilledMail] = useState(true);
  const [filledUsername, setFilledUsername] = useState(true);
  const [filledPassword, setFilledPassword] = useState(true);
  const selector = useSelector((store) => store.loaderStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail(data.email) ? setValidMail(true) : setValidMail(false);
    data.email ? setFilledMail(true) : setFilledMail(false);
    data.password ? setFilledPassword(true) : setFilledPassword(false);
    data.username ? setFilledUsername(true) : setFilledUsername(false);

    if (!data.email || !data.password || !data.username || !validMail) return;

    dispatch(setShowLoader(true));
    const res = await register(data);
    console.log(res);
    if (res) {
      dispatch(setShowLoader(false));
      if (res.status === "succesfull") {
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.warning(res.message);
      }
    }
  };

  const inputChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <>
      {selector.showLoader ? (
        <Loader />
      ) : (
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="register-label">REGISTER</h2>

            <Label htmlFor="email" className="input-label">
              {filledMail
                ? validMail
                  ? "EMAIL"
                  : "EMAIL IS NOT VALID"
                : "EMAIL IS REQUIRED"}
            </Label>
            <Input
              required={true}
              id="email"
              className="register-input"
              placeholder="Enter your email"
              type="text"
              onChange={inputChange}
            />

            <Label htmlFor="username" className="input-label">
              {filledUsername ? "USERNAME" : "USERNAME IS REQUIRED"}
            </Label>
            <Input
              required={true}
              id="username"
              className="register-input"
              placeholder="Enter your username"
              type="text"
              onChange={inputChange}
            />

            <Label htmlFor="password" className="input-label">
              {filledPassword ? "PASSWORD" : "PASSWORD IS REQUIRED"}
            </Label>
            <Input
              required={true}
              onChange={inputChange}
              id="password"
              className="register-input"
              placeholder="Password"
              type="password"
            />

            <Button type="submit">REGISTER</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
