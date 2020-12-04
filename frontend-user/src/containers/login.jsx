import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useAuth from "../components/useAuth";
import {
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Icon,
} from "@material-ui/core";
import Copyright from "../components/Copyright";
import googleImg from "../img/icon-google.png";
import {
  addRememberMeChoice,
  getRememberMeChoice,
} from "../utility/localStorageUtility";
import { checkPassword, validateEmail } from "../utility/verificationUtility";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGoogle: {
    color: "#555555",
  },
  btnFb: {
    color: "#3b5998",
  },
  btnGoogleImg: {
    width: 16,
  },
  signUpText: {
    fontFamily: "Raleway, sans-serif",
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

export default function Login() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [remember, setRememberMe] = useState(getRememberMeChoice());
  const [formError, setFormError] = useState(null);

  let { from } = location.state || { from: { pathname: "/" } };

  const checkFormValid = () => {
    return validateEmail(email) && checkPassword(password);
  };

  const generateErrorOnInValid = () => {
    if (validateEmail(email)) {
      setEmailError(null);
    } else {
      setEmailError("Invalid email format");
    }
    if (checkPassword(password)) {
      setPasswordError(null);
    } else {
      setPasswordError("This can be there");
    }
  };
  const login = (event, email, password) => {
    event.preventDefault();
    setFormError(null);
    if (checkFormValid()) {
      auth.signInWithEmail(
        email,
        password,
        () => {
          history.replace(from);
        },
        (error) => {
          setFormError(error);
        }
      );
    } else {
      generateErrorOnInValid();
    }
  };

  const signInWithGoogle = () => {
    setFormError(null);
    auth.signInWithGoogle(
      () => {
        history.replace(from);
      },
      (error) => {
        setFormError(error);
      }
    );
  };
  const logInWithFacebook = () => {
    setFormError(null);
    auth.signInWithFacebook(
      () => {
        history.replace(from);
      },
      (error) => {
        setFormError(error);
      }
    );
  };

  const setOnEmailChangeListener = (ev) => {
    setEmail(ev.target.value);
    setEmailError(null);
  };
  const setOnPasswordChangeListener = (ev) => {
    setPassword(ev.target.value);
    setPasswordError(null);
  };

  const setOnRemmeberMeChangeListener = (ev) => {
    const checked = ev.target.checked
    setRememberMe(checked);
    addRememberMeChoice(checked);
    auth.setPersistenceHelper(
      checked,
      () => {
        console.log("Preference saved");
      },
      (error) => {
        setFormError(error);
      })
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Card elevation={4}>
        <CardHeader title="Log In" />
        <CardContent>
          <div className={classes.paper}>
            <form className={classes.form} type="POST" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
                onChange={setOnEmailChangeListener}
                autoFocus
                helperText={emailError}
                error={emailError !== null}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={setOnPasswordChangeListener}
                helperText={passwordError}
                error={passwordError !== null}
              />
              <Typography align="right" variant="caption" component="p">
                <Link href="#" variant="caption">
                  Forgot password?
                </Link>
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    value="remember"
                    color="primary"
                    onChange={setOnRemmeberMeChangeListener}
                  />
                }
                label="Remember me"
              />
              {formError && (
                <Typography
                  variant="caption"
                  component="p"
                  gutterBottom
                  className={classes.errorText}
                >
                  {formError.message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(event) => login(event, email, password)}
              >
                Sign In
              </Button>
              <ButtonGroup
                variant="text"
                aria-label="Sign In with third party provider"
                fullWidth={true}
              >
                <Button
                  variant="outlined"
                  className={classes.btnGoogle}
                  startIcon={
                    <Icon>
                      <img
                        src={googleImg}
                        alt="google"
                        className={classes.btnGoogleImg}
                      />
                    </Icon>
                  }
                  onClick={signInWithGoogle}
                >
                  Google
                </Button>
                <Button
                  variant="outlined"
                  className={classes.btnFb}
                  startIcon={<Icon>facebook-official</Icon>}
                  onClick={logInWithFacebook}
                >
                  FaceBook
                </Button>
              </ButtonGroup>
              <Box>
                <Typography
                  align="center"
                  variant="subtitle1"
                  component="p"
                  gutterBottom
                  className={classes.signUpText}
                >
                  New to MovieWeb?
                  <Link href="registration" variant="body2">
                    {" Sign Up"}
                  </Link>
                </Typography>
              </Box>
            </form>
          </div>
        </CardContent>
        <Box m={4}>
          <Copyright />
        </Box>
      </Card>
    </Container>
  );
}
