import {
  Button,
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import facebookIcon from "../img/icon-facebook.png";
import facebookDarkIcon from "../img/icon-facebook-dark.png";

const useStyles = makeStyles((theme) => ({
  btnFbText: {
    width: "100%",
    textTransform: "capitalize",
  },
  btnFb: {
    padding: theme.spacing(0, 1, 0, 1),
    transition:
      "filter 220ms cubic-bezier(0.4, 0, 0.2, 1) 220ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      "& $btnFbImg": {
        filter: "brightness(0.85)",
      },
    },
  },
  btnFbImg: {
    height: theme.spacing(5),
    padding: theme.spacing(0.5),
  },
}));
const FacebookButton = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: prefersDarkMode ? "#1877F2" : "#ffffff",
      },
      text: {
        primary: prefersDarkMode ? "#ffffff" : "#1877F2",
      },
    },
  });
  const { onClick, disabled, className, ...extraProps } = props;
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        className={[classes.btnFb, className].join(" ")}
        startIcon={
          <img
            src={prefersDarkMode ? facebookDarkIcon : facebookIcon}
            alt="facebook"
            className={classes.btnFbImg}
          />
        }
        onClick={onClick}
        fullWidth
        color="primary"
        disabled={disabled}
        {...extraProps}
      >
        <Typography variant="button" className={classes.btnFbText}>
          Login with Facebook
        </Typography>
      </Button>
    </ThemeProvider>
  );
};

export default FacebookButton;
