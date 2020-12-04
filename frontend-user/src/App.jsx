import React from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Login from './containers/login';
import Registration from './containers/registration';
import MovieIndex from './containers/movieIndex';
import MovieDetail from './containers/movieDetail';
import PrivateRoute from "./components/PrivateRoute";
import ProvideAuth from "./components/ProvideAuth";
import AuthRoute from "./components/AuthRoute";

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main:'#FFAF29',
          },
          secondary:{
            main: '#8539BE',
          },
          background:{
            paper:prefersDarkMode?'#212121':'#fff',
            default: prefersDarkMode?'#121212':'#fafafa'
          },
          error:{
            main: "#CF6679"
          }
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <ProvideAuth>
    <Router>
      <div>
        <Switch>
          <AuthRoute exact path="/login" children={<Login/>}/>
          <AuthRoute path="/registration" children={<Registration/>}/>
          <Switch>
            <PrivateRoute exact path="/" children={<MovieIndex />}/>
            <PrivateRoute path="/movie/:id" children={<MovieDetail />}/>
            </Switch>
        </Switch>
      </div>
    </Router>
    </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;
