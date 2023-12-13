import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AdminRoute({ children }) {
  const currentUser = useSelector((state) => state.auth.user);

  return currentUser.id && (
    currentUser.admin ? (
      children
    ) : (
      <Navigate to={"/404"} />
    )
  )
}
