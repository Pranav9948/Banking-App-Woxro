import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoutes(props) {
  if (localStorage.getItem("BankUserId")) {
    return <Navigate to={"/"} />;
  } else {
    return props.children;
  }
}

export default PublicRoutes;