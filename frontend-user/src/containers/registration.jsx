import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
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
  Grid,
  Icon,
} from "@material-ui/core";
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
  btnGoogle: {
    color: "#555555",
  },
  btnFb: {
    color: "#3b5998",
  },
  btnGoogleImg: {
    width: 19,
  },
  logInText: {
    fontFamily: "Raleway, sans-serif",
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

export default function Registration() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRememberMe] = useState(getRememberMeChoice());
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);

  let { from } = location.state || { from: { pathname: "/" } };

  const checkConfirmPassword = (password = "", confirmPassword = "") => {
    return password === confirmPassword;
  };

  const checkFormValid = () => {
    return (
      validateEmail(email) &&
      checkPassword(password) &&
      checkConfirmPassword(password, confirmPassword)
    );
  };

  const generateErrorOnInValid = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(null);
    }
    if (!checkPassword(password)) {
      setPasswordError("Passsword is weak");
    } else {
      setPasswordError(null);
    }
    if (!checkConfirmPassword()) {
      setConfirmPasswordError("Should be same as password");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const registration = (event, email, password) => {
    event.preventDefault();
    setFormError(null);
    if (checkFormValid()) {
      auth.signUpWithEmail(
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

  const signUpWithGoogle = () => {
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

  const setOnConfirmPasswordChangeListener = (ev) => {
    setConfirmPassword(ev.target.value);
    if (ev.target.value !== password) {
      setConfirmPasswordError("Should be same as password");
    } else {
      setConfirmPasswordError(null);
    }
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
      }
    );
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Card elevation={4} className={classes.paper}>
        <CardHeader title="Sign Up" />
        <CardContent>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={setOnEmailChangeListener}
                value={email}
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
                value={password}
                helperText={passwordError}
                error={passwordError !== null}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                onChange={setOnConfirmPasswordChangeListener}
                value={confirmPassword}
                helperText={confirmPasswordError}
                error={confirmPasswordError !== null}
              />
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
                onClick={(event) => registration(event, email, password)}
              >
                <Typography variant="button" className={classes.logInText}>Sign Up</Typography>
              </Button>
              <Box>
                <Typography
                  align="center"
                  variant="h6"
                  component="p"
                  gutterBottom
                  className={classes.logInText}
                >
                  Or
                </Typography>
              <Grid container spacing={2} direction="column" justify="center">
                <Grid item xs={12}>
                   <GoogleButton onClick={signUpWithGoogle} />
                </Grid>
               <Grid item xs={12}>
                <FacebookButton onClick={logInWithFacebook}/>
                 </Grid>
              </Grid>
              </Box>
            </form>
        </CardContent>
        <Box m={2}>
              <Box>
                <Typography
                  align="center"
                  variant="subtitle1"
                  component="p"
                  gutterBottom
                  className={classes.logInText}
                >
                  Already a member?
                  <Link href="login">
                    {" Log In"}
                  </Link>
                </Typography>
              </Box>
          <Copyright />
        </Box>
      </Card>
    </Container>
  );
}
