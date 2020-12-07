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
import { Card, CardContent, CardHeader, LinearProgress } from "@material-ui/core";
import Copyright from "../components/Copyright";
import {
  addRememberMeChoice,
  getRememberMeChoice,
} from "../utility/localStorageUtility";
import { checkPassword, validateEmail } from "../utility/verificationUtility";
import GoogleButton from "../components/googleButton";
import FacebookButton from "../components/facebookButton";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2)
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
  signUpText: {
    fontFamily: "Raleway, sans-serif",
  },
  errorText: {
    color: theme.palette.error.main,
  },
  [theme.breakpoints.down("sm")]: {
    container: {
      minWidth: "100vw",
      minHeight: "100vh",
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      padding: theme.spacing(0),
      overflow: "auto"
    },
    paper:{
      height: "100vh",
      overflow: "auto",
      padding: theme.spacing(1)
    }
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
  const [submitForm, setSubmit] = useState(false);

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
    setSubmit(true);
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
          setSubmit(false);
        }
      );
    } else {
      generateErrorOnInValid();
      setSubmit(false);
    }
  };

  const signInWithGoogle = () => {
    setFormError(null);
    setSubmit(true);
    auth.signInWithGoogle(
      () => {
        history.replace(from);
      },
      (error) => {
        setFormError(error);
        setSubmit(false);
      }
    );
  };
  const logInWithFacebook = () => {
    setFormError(null);
    setSubmit(true);
    auth.signInWithFacebook(
      () => {
        history.replace(from);
      },
      (error) => {
        setFormError(error);
        setSubmit(false);
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
    const checked = ev.target.checked;
    setRememberMe(checked);
    addRememberMeChoice(checked);
    auth.setPersistenceHelper(
      checked,
      () => {
        console.log("Preference saved");
      },
      (error) => {
        setFormError(error);
      }
    );
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Card elevation={4} className={classes.paper}>
        {submitForm&&<LinearProgress  color="secondary"/>}
        <CardHeader title="Log In" />
        <CardContent>
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
              <Link href="/reset-password" variant="caption">
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
              disabled={submitForm}
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
              disabled={submitForm}
            >
              <Typography variant="button" className={classes.signUpText}>
                Sign In
              </Typography>
            </Button>
            <Typography
              align="center"
              variant="h6"
              className={classes.signUpText}
              gutterBottom
            >
              Or
            </Typography>
            <Grid container spacing={2} direction="column" justify="center">
              <Grid item xs={12}>
                <GoogleButton onClick={signInWithGoogle} 
              disabled={submitForm}/>
              </Grid>
              <Grid item xs={12}>
                <FacebookButton onClick={logInWithFacebook}
              disabled={submitForm} />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Box m={4}>
          <Box>
            <Typography
              align="center"
              variant="subtitle1"
              component="p"
              gutterBottom
              className={classes.signUpText}
            >
              New to MovieWeb?
              <Link href="registration">{" Sign Up"}</Link>
            </Typography>
          </Box>
          <Copyright />
        </Box>
      </Card>
    </Container>
  );
}
