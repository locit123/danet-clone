import React from "react";
import "./GlobalLayout.css";
const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container">{children}</div>;
};

export default GlobalLayout;
