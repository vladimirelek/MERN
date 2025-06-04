import { NavLink } from "react-router";
import { routesConfig } from "../../config/routesConfig";
import "./Navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../store/currency/currencySlice";
import { logOutUser } from "../../store/user/userSlice"; //
import { useEffect } from "react";
import { setUser } from "../../store/user/userSlice";
import { useNavigate } from "react-router";
import { FaCircle } from "react-icons/fa";
import { setUnread } from "../../store/unread/unreadSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const selector = useSelector((store) => store.currencyStore);
  const cartSelector = useSelector((store) => store.cartStore);
  const userSelector = useSelector((store) => store.userStore);
  const unreadSelector = useSelector((store) => store.unreadStore);
  const currency = selector.currency;

  // Debug log for unread state
  useEffect(() => {
    console.log("Navigation - Unread state:", unreadSelector.hasUnread);
  }, [unreadSelector.hasUnread]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const changeCurrency = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logOutUser());
  };

  const handleChatClick = () => {
    dispatch(setUnread(false));
  };

  return (
    <header>
      <div className="container">
        <div className="navigation-wrapper">
          <div className="currency">
            <select onChange={changeCurrency} defaultValue={currency}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="KM">KM</option>
            </select>
          </div>
          <div className="navigation">
            <nav>
              <ul>
                <li>
                  <NavLink to={routesConfig.SHOP.url}>SHOP</NavLink>
                </li>
                <li>
                  <NavLink to={routesConfig.CART.url}>
                    CART(
                    {cartSelector.cartItems.length})
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routesConfig.CONTACT.url}>CONTACT</NavLink>
                </li>

                {/* Show username and LOGOUT if user is logged in */}
                {userSelector.user.username ? (
                  <>
                    <li>
                      <span className="welcome-message">
                        👋 Welcome,{" "}
                        <strong>{userSelector.user.username}</strong>
                      </span>
                    </li>
                    <li className="chat-link">
                      <NavLink
                        to={routesConfig.CHAT.url}
                        onClick={handleChatClick}
                      >
                        CHAT
                        {unreadSelector.hasUnread && (
                          <span className="notification-dot">●</span>
                        )}
                      </NavLink>
                    </li>
                    <li>
                      {userSelector.user.role === "admin" ? (
                        <NavLink to={"/dashboard"}>ADMIN</NavLink>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      <h3 onClick={handleLogout} className="logout-btn">
                        LOGOUT
                      </h3>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to={routesConfig.LOGIN.url}>LOGIN</NavLink>
                    </li>
                    <li>
                      <NavLink to={routesConfig.REGISTER.url}>REGISTER</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
