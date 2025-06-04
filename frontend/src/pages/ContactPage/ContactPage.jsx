import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import Textarea from "../../components/TextArea/TextArea";
import "./ContactPage.scss";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { contactAdmin } from "../../services/userService";
const ContactPage = () => {
  const userSelector = useSelector((store) => store.userStore);
  const formRef = useRef(null);
  const [user, setUser] = useState({
    to: "vladimirelek0@gmail.com",
    from: "",
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userSelector);
    const newUser = { ...user, from: userSelector.user.email };
    const res = await contactAdmin(newUser);
    if (res.status === "successful") {
      formRef.current.reset();
      toast.success(res.message);
    } else {
      toast.warning(res.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
        <h2 className="contact-label">Contact FitZone</h2>

        <Label htmlFor="message" className="input-label">
          MESSAGE
        </Label>
        <Textarea
          name="message"
          id="message"
          className="contact-input"
          placeholder="Your message"
          rows="5"
          onChange={handleChange}
          required
        />

        <Button type="submit" className="contact-button">
          SEND MESSAGE
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
