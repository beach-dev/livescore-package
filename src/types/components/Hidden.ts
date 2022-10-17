import React from "react";

// ----------------------------------------------
export interface HiddenProps {
  wHide?: Array<number>;
  wShow?: Array<number>;
  children?: React.ReactNode;
}
export interface HiddenItemProps {
  mode: "show" | "hide";
  breakpoints: number;
}
