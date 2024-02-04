import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {LockRounded as LockIcon} from "@material-ui/icons";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useAuth from "../hooks/useAuth";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import Copyright from "../components/Copyright";
import {validateEmail} from "../utility/verificationUtility";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
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
  helperPasswordText: {
    ...theme.typography.subtitle1,
  },
  fieldLen: {
    maxWidth: "500px",
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
    helperPasswordText: {
      ...theme.typography.body2,
    },
  },
}));

export default function PasswordReset() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [formError, setFormError] = useState(null);

  let { from } = location.state || { from: { pathname: "/" } };

  React.useEffect(() => {}, [email, emailError, formError]);

  const checkFormValid = () => {
    return validateEmail(email.trim());
  };

  const generateErrorOnInValid = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(null);
    }
  };

  const setOnforgotPasswordClick = (event, email) => {
    event.preventDefault();
    if (checkFormValid()) {
      auth.resetPassword(
        email.trim(),
        () => {
          console.log("Email sent!!");
          history.replace(from);
        },
        (error) => {
          setFormError(error.message);
        }
      );
    } else {
      generateErrorOnInValid();
    }
  };

  const setOnEmailChangeListener = (ev) => {
    setEmail(ev.target.value);
    setEmailError(null);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Card elevation={4} className={classes.paper}>
        <CardHeader
          title="Reset Password"
          titleTypographyProps={{ align: "center" }}
        />
        <Box display="flex" justifyContent="center">
          <Box>
            <LockIcon fontSize="large" />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="subtitle1"
              align="left"
              component="p"
              className={classes.helperPasswordText}
            >
              Enter your email address and we'll send you a link to reset
              password
            </Typography>
          </Box>
        </Box>
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
              onClick={(event) => setOnforgotPasswordClick(event, email)}
            >
              <Typography variant="button" className={classes.logInText}>
                Reset Password
              </Typography>
            </Button>
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
              Back to
              <Link href="login">{" Log In"}</Link>
            </Typography>
          </Box>
          <Copyright />
        </Box>
      </Card>
    </Container>
  );
}
