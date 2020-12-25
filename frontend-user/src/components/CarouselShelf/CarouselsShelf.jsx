import React, { memo, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, useMediaQuery } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { CAROUSEL_ITEM_VARIANT, ERROR, LOADED, LOADING } from "../../constants/constants";
import CarouselsShelfHeader from "./CarouselsShelfHeader/CarouselsShelfHeader";
import CarouselsShelfItems from "./CarouselsShelfItems/CarouselsShelfItems";
import "./carouselsShelf.css";
import PaperIconWrapper from "../PaperIconWrapper/PaperIconWrapper";

const useStyles = makeStyles((theme) => ({
  navShelfIconsContainer: ({ cardHeight, cardMarginEnd }) => ({
    position: "absolute",
    top: (cardHeight + 2 * cardMarginEnd) / 2,
    transform: "translate3d(-50%, -50%, 0)",
    borderRadius: "50%",
    zIndex: 2,
  }),
  navShelfIcon: {
    width: "var(--icon-button-width)",
    minWidth: "var(--icon-button-width)",
    height: "var(--icon-button-width)",
    zIndex: "inherit",
    borderRadius: "50%",
    boxShadow: theme.shadows[6],
  },
  prevIconContainer: {
    left: 0,
  },
  nextIconContainer: {
    left: "100%"
  },
}));

const CarouselsShelf = (props) => {
  const {
    carouselsData,
    cardBaseWidth,
    cardBaseHeight,
    cardMarginEnd,
    getCardID,
    itemVariant,
    onItemClick
  } = props;
  const { requestState, data: carouselsList, error } = carouselsData;

  const classes = useStyles({
    cardHeight: cardBaseHeight,
    cardMarginEnd: cardMarginEnd,
  });
  const carouselContainerRef = useRef(null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const getScrollContainerValue = useMemo(() => {
    var style = getComputedStyle(document.body);
    const bodyWidth = parseInt(style.width);
    const appSpacing = parseInt(style.getPropertyValue("--app-spacing"));
    const movieCardWidth = cardBaseWidth + cardMarginEnd;
    const cardPossible = Math.floor((bodyWidth - appSpacing) / movieCardWidth);
    return cardPossible * movieCardWidth;
  }, [cardBaseWidth, cardMarginEnd]);

  const onPrevButtonClicked = () => {
    if (carouselContainerRef) {
      carouselContainerRef.current.scrollLeft -= getScrollContainerValue;
    }
  };

  const onNextButtonClicked = () => {
    if (carouselContainerRef) {
      carouselContainerRef.current.scrollLeft += getScrollContainerValue;
    }
  };

  return (
    <Box>
      {requestState === LOADED &&
        error === null &&
        carouselsList &&
        carouselsList.length > 0 &&
        carouselsList.map((carousel, index) => {
          return (
            <Box key={index} component="section" className="mwtitle-section">
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
                  dark={prefersDarkMode}
                  getCardID={getCardID}
                  cardWidth={cardBaseWidth}
                  cardHeight={cardBaseHeight}
                  itemVariant={itemVariant}
                  onItemClick={onItemClick?onItemClick:null}
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

CarouselsShelf.propTypes = {
  carouselsData: PropTypes.exact({
    requestState: PropTypes.oneOf([LOADING, ERROR, LOADED]),
    data: PropTypes.arrayOf(PropTypes.any),
    error: PropTypes.any,
  }),
  cardBaseWidth: PropTypes.number.isRequired,
  cardBaseHeight: PropTypes.number.isRequired,
  cardMarginEnd: PropTypes.number.isRequired,
  getCardID: PropTypes.func.isRequired,
  itemVariant: PropTypes.oneOf([CAROUSEL_ITEM_VARIANT.MOVIE, CAROUSEL_ITEM_VARIANT.TRAILER]).isRequired,
  onItemClick: PropTypes.func
};

export default memo(CarouselsShelf);
