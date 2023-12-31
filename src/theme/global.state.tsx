import styled, { createGlobalStyle } from "styled-components";
import { get } from "styled-system";
import css from "@styled-system/css";

export const InjectRTL = styled.div`
  ${({ lang }) =>
    (lang === "ar" || lang === "he") &&
    `
    font-family: 'Dosis', sans-serif;
    `}
`;

export const GlobalStyle = createGlobalStyle(({ theme }) =>
  css({
    "*, *::before, *::after": {
      boxSizing: "border-box",
      outline: "none !important",
    },
    "*": {
      margin: 0,
      padding: 0,
    },
    html: {
      scrollBehavior: "smooth",
      overflowX: "hidden",
    },
    body: {
      scrollBehavior: "smooth",
      transition: get(theme, "transition.normal"),
      fontFamily: '"Dosis" ,sans-serif !important',
      lineHeight: "1.5",
      WebkitTextSizeAdjust: "100%",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      button: {
        "-moz-user-select": "none",
        "-khtml-user-select": "none",
        "-webkit-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
      },
    },
    "::-webkit-scrollbar": {
      width: "3px",
    },
    "::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px grey",
      borderRadius: "10px",
    },
    " ::-webkit-scrollbar-thumb": {
      background: get(theme, "colors.primary.regular"),
      borderRadius: "6px",
    },
    h1: {
      color: get(theme, "colors.black.100"),
      fontFamily: "base",
      fontSize: "5xl",
      fontWeight: "bolder",
      zIndex: 10,
      margin: 0,
    },
    h2: {
      color: get(theme, "colors.black.100"),
      fontFamily: "base",
      fontSize: "4xl",
      fontWeight: "bold",
      zIndex: 10,
      margin: 0,
    },
    h3: {
      color: get(theme, "colors.black.100"),
      fontFamily: "base",
      fontSize: "xl",
      fontWeight: "bold",
      zIndex: 10,
      margin: 0,
    },
    h4: {
      color: get(theme, "colors.black.100"),
      fontFamily: "base",
      fontSize: "xl",
      fontWeight: "regular",
      zIndex: 10,
      margin: 0,
    },
    h5: {
      color: get(theme, "colors.black.100"),
      fontFamily: "base",
      fontSize: "mm",
      fontWeight: "regular",
      zIndex: 10,
      margin: 0,
    },
    h6: {
      fontFamily: "base",
      fontSize: "base",
      fontWeight: "medium",
      zIndex: 10,
      margin: 0,
    },

    "p,span,button,li,div": {
      margin: 0,
      transition: get(theme, "transition.normal"),
      fontFamily: get(theme, "fonts.base"),
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "1.5",
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.004)",
    },
    sup: {
      top: "-0.5em",
    },
    sub: {
      bottom: "-0.25em",
    },
    "sub,sup": {
      position: "relative",
      fontSize: "75%",
      lineHeight: 0,
      verticalAlign: "baseline",
    },
    a: {
      fontFamily: "base",
      textDecoration: "none",
      color: "inherit",
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    li: {
      listStyle: "none",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    button: {
      appearance: "none",
    },
    img: {
      maxWidth: "100%",
    },
    // custom
    ".noscroll": {
      "::-webkit-scrollbar": {
        width: "0px",
        height: "0px",
      },
    },
    "#nprogress": {
      pointerEvents: "none",
    },
    "#nprogress .bar": {
      top: "0",
      left: "0",
      height: "2px",
      width: "100%",
      position: "fixed",
      zIndex: "9999",
      background: get(theme, "colors.primary.regular"),
      boxShadow: `0 0 2px ${get(theme, "colors.primary.regular")}`,
    },
    "#nprogress .peg": {
      right: "0",
      opacity: "1",
      width: "100px",
      height: "100%",
      display: "block",
      position: "absolute",
      transform: "rotate(3deg) translate(0px, -4px)",
      boxShadow: `0 0 10px ${get(
        theme,
        "colors.primary.regular"
      )}, 0 0 5px ${get(theme, "colors.primary.regular")}`,
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...theme.globals,
  })
);
