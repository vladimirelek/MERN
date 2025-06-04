import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { routesConfig } from "../config/routesConfig";
const AdminProtect = (prop) => {
  const selector = useSelector((store) => store.userStore);
  return (
    <>
      {selector.user.role === "admin" ? (
        prop.children
      ) : (
        <Navigate to={routesConfig.SHOP.url} />
      )}
    </>
  );
};
export default AdminProtect;
