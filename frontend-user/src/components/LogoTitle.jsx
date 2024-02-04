import React, { memo } from "react";
import { Link, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    display: "block",
    color: "#f13030",
    transition: "all 0.1s ease-in-out",
    fontFamily: "Russo One, sans-serif",
  },
}));

const LogoTitle = memo((props) => {
  const classes = useStyles();
  return (
    <Link
      to="/"
      component={RouterLink}
      variant="h5"
      className={classes.title}
      underline="none"
    >
      MovieWeb
    </Link>
  );
});

export default LogoTitle;
