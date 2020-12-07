import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box, CssBaseline } from "@material-ui/core";
import PrivateRoute from "./components/PrivateRoute";
import ProvideAuth from "./components/ProvideAuth";
import AuthRoute from "./components/AuthRoute";
import FullScreenLoader from "./components/FullScreenLoader";
import PasswordReset from "./components/PasswordReset";

const Login = lazy(() => import("./containers/login"));
const Registration = lazy(() => import("./containers/registration"));
const MovieIndex = lazy(() => import("./containers/movieIndex"));
const MovieDetail = lazy(() => import("./containers/movieDetail"));

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#FFAF29",
          },
          secondary: {
            main: "#8539BE",
          },
          background: {
            paper: prefersDarkMode ? "#212121" : "#fff",
            default: prefersDarkMode ? "#121212" : "#fafafa",
          },
          error: {
            main: "#CF6679",
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<FullScreenLoader />}>
        <ProvideAuth>
          <Router>
            <Box>
              <Switch>
                <AuthRoute exact path="/login" children={<Login />} />
                <AuthRoute path="/registration" children={<Registration />} />
                <Route path="/reset-password" children={<PasswordReset/>}></Route>
                <Switch>
                  <PrivateRoute exact path="/" children={<MovieIndex />} />
                  <PrivateRoute path="/movie/:id" children={<MovieDetail />} />
                </Switch>
              </Switch>
            </Box>
          </Router>
        </ProvideAuth>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
