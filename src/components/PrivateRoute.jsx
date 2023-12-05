import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import checkAuth from "../utils/checkAuth";

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function PrivateRoute({ children }) {

  return checkAuth() ? children : <Navigate to="/login" />;
}
