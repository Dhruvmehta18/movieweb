import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  boxContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const FullScreenLoader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.boxContainer}>
      <CircularProgress />
    </Box>
  );
};

export default FullScreenLoader;
