import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const { token } = useSelector((store) => store.auth);

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedLayout;
