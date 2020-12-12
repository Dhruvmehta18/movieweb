import React from "react";
import { Box, IconButton, makeStyles } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { LOADED } from "../../constants/constants";
import CarouselsShelfHeader from "./CarouselsShelfHeader/CarouselsShelfHeader";
import CarouselsShelfItems from "./CarouselsShelfItems/CarouselsShelfItems";
import "./carouselsShelf.css";
const useStyles = makeStyles((theme) => ({
  navShelfIconsContainer: {
    position: "absolute",
    top: "calc((var(--movie-card-height) + 2 * var(--movie-card-margin-vertical)) / 2)",
    transform: "translate3d(-50%, -50%, 0)",
    borderRadius: "50%",
    zIndex: 2
  },
  navShelfIcon:{
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    zIndex: "inherit"
  },
  prevIconContainer:{
    left: "var(--carousels-shelf-icons-position)"
  },
  nextIconContainer:{
    right: 0
  }
}));
const CarouselsShelf = (props) => {
  const classes = useStyles();
  const { carouselsList = [] } = props;
  console.log(carouselsList);
  return (
    <Box>
      {carouselsList &&
        carouselsList.requestState === LOADED &&
        carouselsList.data.map((carousel, index) => {
          return (
            <Box key={index}>
              <CarouselsShelfHeader title={carousel.title} />
              <Box position="relative">
                <Box className={[classes.navShelfIconsContainer, classes.prevIconContainer].join(" ")}>
                  <IconButton aria-label="previous" className={classes.navShelfIcon}>
                    <ChevronLeft />
                  </IconButton>
                </Box>
                <CarouselsShelfItems carousel={carousel} />
                <Box className={[classes.navShelfIconsContainer, classes.nextIconContainer].join(" ")}>
                  <IconButton aria-label="next" className={classes.navShelfIcon}>
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default CarouselsShelf;
