import React, { useRef } from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { LOADED } from "../../constants/constants";
import CarouselsShelfHeader from "./CarouselsShelfHeader/CarouselsShelfHeader";
import CarouselsShelfItems from "./CarouselsShelfItems/CarouselsShelfItems";
import "./carouselsShelf.css";
import PaperIconWrapper from "../PaperIconWrapper/PaperIconWrapper";
const useStyles = makeStyles((theme) => ({
  navShelfIconsContainer: {
    position: "absolute",
    top:
      "calc((var(--movie-card-height) + 2 * var(--movie-card-margin-vertical)) / 2)",
    transform: "translate3d(-50%, -50%, 0)",
    borderRadius: "50%",
    zIndex: 2,
  },
  navShelfIcon: {
    width: "var(--icon-button-width)",
    minWidth: "var(--icon-button-width)",
    height: "var(--icon-button-width)",
    zIndex: "inherit",
    borderRadius: "50%",
    boxShadow: theme.shadows[6],
  },
  prevIconContainer: {
    left: "var(--carousels-shelf-icons-position)",
  },
  nextIconContainer: {
    right: 0,
  },
}));
const CarouselsShelf = (props) => {
  const classes = useStyles();
  const carouselContainerRef = useRef(null);
  const { carouselsList = [] } = props;
  const getScrollContainerValue = () => {
    var style = getComputedStyle(document.body);
    const bodyWidth = parseInt(style.width);
    const movieCardBaseWidth = parseInt(
      style.getPropertyValue("--movie-card-width")
    );
    const appSpacing = parseInt(style.getPropertyValue("--app-spacing"));
    const movieCardMarginEnd = parseInt(
      style.getPropertyValue("--movie-card-margin-end")
    );
    const movieCardWidth = movieCardBaseWidth + movieCardMarginEnd;
    const cardPossible = Math.floor((bodyWidth - appSpacing) / movieCardWidth);
    return cardPossible * movieCardWidth;
  };

  const onPrevButtonClicked = () => {
    if (carouselContainerRef) {
      carouselContainerRef.current.scrollLeft -= getScrollContainerValue();
    }
  };

  const onNextButtonClicked = () => {
    if (carouselContainerRef) {
      getScrollContainerValue();
      carouselContainerRef.current.scrollLeft += getScrollContainerValue();
    }
  };
  return (
    <Box>
      {carouselsList &&
        carouselsList.requestState === LOADED &&
        carouselsList.data.map((carousel, index) => {
          return (
            <Box key={index}>
              <CarouselsShelfHeader title={carousel.title} />
              <Box position="relative">
                <Box
                  className={[
                    classes.navShelfIconsContainer,
                    classes.prevIconContainer,
                  ].join(" ")}
                >
                  <PaperIconWrapper>
                    <Button
                      color="primary"
                      variant="contained"
                      aria-label="previous"
                      className={classes.navShelfIcon}
                      onClick={onPrevButtonClicked}
                    >
                      <ChevronLeft />
                    </Button>
                  </PaperIconWrapper>
                </Box>
                <CarouselsShelfItems
                  carousel={carousel}
                  carouselRef={carouselContainerRef}
                />
                <Box
                  className={[
                    classes.navShelfIconsContainer,
                    classes.nextIconContainer,
                  ].join(" ")}
                >
                  <PaperIconWrapper>
                    <Button
                      color="primary"
                      variant="contained"
                      aria-label="next"
                      className={classes.navShelfIcon}
                      onClick={onNextButtonClicked}
                    >
                      <ChevronRight />
                    </Button>
                  </PaperIconWrapper>
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default CarouselsShelf;
