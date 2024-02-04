import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useAuth from "../hooks/useAuth";
import {Card, CardContent, CardHeader, Grid, LinearProgress,} from "@material-ui/core";
import Copyright from "../components/Copyright";
import {addRememberMeChoice, getRememberMeChoice,} from "../utility/localStorageUtility";
import {checkPassword, validateEmail} from "../utility/verificationUtility";
import GoogleButton from "../components/googleButton";
import FacebookButton from "../components/facebookButton";
import withHeader from "../hoc/withHeader";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logInText: {
    fontFamily: "Raleway, sans-serif",
  },
  errorText: {
    color: theme.palette.error.main,
  },
  fieldLen: {
    maxWidth: "500px",
  },
  fixField: {
    width: "100%",
    margin: "0 auto",
  },
  [theme.breakpoints.down("sm")]: {
    container: {
      minWidth: "100vw",
      minHeight: "100vh",
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      padding: theme.spacing(0),
      overflow: "auto",
    },
    paper: {
      height: "100vh",
      overflow: "auto",
      padding: theme.spacing(1),
    },
  },
}));

function Registration() {
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
  const [submitForm, setSubmit] = useState(false);

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
    setSubmit(true);
    setFormError(null);
    if (checkFormValid()) {
      auth.signUpWithEmail(
        email,
        password,
        () => {
          history.replace(from);
          setSubmit(false);
        },
        (error) => {
          setFormError(error);
          setSubmit(false);
        }
      );
    } else {
      setSubmit(false);
      generateErrorOnInValid();
    }
  };

  const signUpWithGoogle = () => {
    setFormError(null);
    setSubmit(true);
    auth.signInWithGoogle(
      () => {
        history.replace(from);
        setSubmit(false);
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
        setSubmit(false);
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

  const setOnConfirmPasswordChangeListener = (ev) => {
    setConfirmPassword(ev.target.value);
    if (ev.target.value !== password) {
      setConfirmPasswordError("Should be same as password");
    } else {
      setConfirmPasswordError(null);
    }
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
      {submitForm && <LinearProgress color="secondary" />}
      <Card elevation={4} className={classes.paper}>
        <CardHeader
          title="Sign Up"
          titleTypographyProps={{ align: "center" }}
        />
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
              className={classes.fieldLen}
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
              className={classes.fieldLen}
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
              className={classes.fieldLen}
            />
            <FormControlLabel
              className={[classes.fixField, classes.fieldLen].join(" ")}
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
              className={[classes.submit, classes.fieldLen].join(" ")}
              onClick={(event) => registration(event, email, password)}
            >
              <Typography variant="button" className={classes.logInText}>
                Sign Up
              </Typography>
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
              <Grid container spacing={2} direction="row" justify="center">
                <Grid item xs={12}>
                  <GoogleButton
                    onClick={signUpWithGoogle}
                    className={classes.fieldLen}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FacebookButton
                    onClick={logInWithFacebook}
                    className={classes.fieldLen}
                  />
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
              <Link href="/login">{" Log In"}</Link>
            </Typography>
          </Box>
          <Copyright/>
        </Box>
      </Card>
    </Container>
  );
}

export default withHeader(Registration);
