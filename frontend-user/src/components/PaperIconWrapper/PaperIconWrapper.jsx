import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const PaperIconWrapper = (props) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ffffff",
        light: "#ffffff",
        dark: "#cccccc",
        contrastText: "#121212",
      },
    },
  });
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default PaperIconWrapper;
