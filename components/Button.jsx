"use client";

import React from "react";

const NavButton = ({
  children,
  variant = "",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const base = "btn fw-semibold navbar-btn";

  const sizeClass = size === "sm"
    ? "btn-sm"
    : size === "lg"
    ? "btn-lg"
    : "";


  const widthClass = fullWidth ? "w-100" : "";

  const classes = `
    ${base}
    btn-${variant}
    ${sizeClass}
    ${widthClass}
    ${className}
  `.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default NavButton;