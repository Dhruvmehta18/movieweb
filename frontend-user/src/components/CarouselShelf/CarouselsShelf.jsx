import React from "react";
import { Box, IconButton, makeStyles } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { LOADED } from "../../constants/constants";
import CarouselsShelfHeader from "./CarouselsShelfHeader/CarouselsShelfHeader";
import CarouselsShelfItems from "./CarouselsShelfItems/CarouselsShelfItems";
const useStyles = makeStyles(() => ({
  navShelfIcons: {
    position: "absolute",
    top: 'calc(200px / 2)',
    borderRadius: "50%",
  },
}));
const CarouselsShelf = (props) => {
  const classes = useStyles();
  const { carouselsList = [] } = props;
  console.log(carouselsList);
  return (
    <Box margin={2}>
      {carouselsList &&
        carouselsList.requestState === LOADED &&
        carouselsList.data.map((carousel, index) => {
          return (
            <Box margin={2} key={index}>
              <CarouselsShelfHeader title={carousel.title} />
              <Box>
                <Box className={classes.navShelfIcons}>
                <IconButton aria-label="previous">
                  <ChevronLeft />
                </IconButton>
                </Box>
                <CarouselsShelfItems carousel={carousel} />
                <Box className={classes.navShelfIcons}>
                <IconButton aria-label="next">
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
