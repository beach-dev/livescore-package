import * as React from 'react';
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../src/theme";
import { GlobalStyle } from "../src/theme/global.state";
// pages
import { LiveScore } from "../src/page";


export const LiveScoreApp = () => {
  return (
      <ThemeProvider theme={defaultTheme}>
        {/* router part  */}
        <LiveScore />
        <GlobalStyle />
      </ThemeProvider>
  );
};
