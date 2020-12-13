import React from "react";
import {
  Button,
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import googleImgDark from "../img/icon-google-dark.svg";
import googleImgLight from "../img/icon-google-light.svg";

const useStyles = makeStyles((theme) => ({
  btnGoogleTxt: {
    width: "100%",
    textTransform: "capitalize",
  },
  btnGoogleImg: {
    height: theme.spacing(5),
    padding: theme.spacing(0.1),
  },
  btnGoogle: {
    padding: theme.spacing(0, 1, 0, 1),
    justifyContent: "start",
    color: theme.palette.type === "light" ? "#4285F4" : "#ffffff",
    transition:
      "-webkit-filter 220ms cubic-bezier(0.4, 0, 0.2, 1) 220ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      "& $btnGoogleImg": {
        filter: "brightness(0.85)",
      },
    },
  },
}));

const GoogleButton = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: prefersDarkMode ? "#4285F4" : "#ffffff",
      },
    },
  });
  const { onClick, disabled, className, ...extraProps } = props;
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        className={[classes.btnGoogle, className].join(" ")}
        startIcon={
          <img
            src={prefersDarkMode ? googleImgDark : googleImgLight}
            alt="google"
            className={classes.btnGoogleImg}
          />
        }
        onClick={onClick}
        fullWidth
        color="primary"
        disabled={disabled}
        {...extraProps}
      >
        <Typography variant="button" className={classes.btnGoogleTxt}>
          Sign in with Google
        </Typography>
      </Button>
    </ThemeProvider>
  );
};

export default GoogleButton;
