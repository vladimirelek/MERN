import { Route, Routes } from "react-router";
import ShopPage from "./pages/ShopPage/ShopPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { routesConfig } from "./config/routesConfig";
import Navigation from "./components/Navigation/navigation";
import "./config/axiosConfig";
import { ToastContainer } from "react-toastify";
import AdminProtect from "./adminComponents/AdminProtect";
import Dashboard from "./pages/Dashboard/dashboard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDashBoard } from "./store/dashboard/dashBoardSlice";
import { useEffect } from "react";
import { useLocation } from "react-router";
import AdminDashboard from "./adminComponents/AdminDashboard";
import Comments from "./adminComponents/comments/Comments";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import AddProduct from "./adminComponents/AddProduct/AddProduct";
import Cart from "./pages/CartPage/Cart";
import Products from "./adminComponents/products/Products";
import ChatPage from "./pages/ChatPage/ChatPage";
function App() {
  const dispatch = useDispatch();
  const selector = useSelector((store) => store.dashBoardStore);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/dashboard")) {
      dispatch(setDashBoard(true));
    } else {
      dispatch(setDashBoard(false));
    }
  }, [dispatch, location]);
  return (
    <>
      {selector.dashboard ? "" : <Navigation />}
      <ToastContainer />
      <Routes>
        <Route path={routesConfig.SHOP.url} element={<ShopPage />} />
        <Route path={routesConfig.LOGIN.url} element={<LoginPage />} />
        <Route path={routesConfig.CONTACT.url} element={<ContactPage />} />
        <Route path={routesConfig.REGISTER.url} element={<RegisterPage />} />
        <Route path={routesConfig.CHAT.url} element={<ChatPage />} />
        <Route
          path={routesConfig.DASHBOARD.url}
          element={
            <AdminProtect>
              <Dashboard />
            </AdminProtect>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="add-products" element={<AddProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/singleProduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
