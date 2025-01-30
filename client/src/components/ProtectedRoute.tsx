import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <NavLink to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
