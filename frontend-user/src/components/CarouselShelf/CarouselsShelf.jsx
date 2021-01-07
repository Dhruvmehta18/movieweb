import React, {memo} from "react";
import PropTypes from "prop-types";
import {Box, useMediaQuery} from "@material-ui/core";
import {CAROUSEL_ITEM_VARIANT, ERROR, LOADED, LOADING} from "../../constants/constants";
import "./carouselsShelf.css";
import CarouselShelfRow from "./CarouselShelfRow";

const CarouselsShelf = memo((props) => {
  const {
    carouselsData,
    cardBaseWidth,
    cardBaseHeight,
    cardMarginEnd,
    getCardID,
    itemVariant,
    onItemClick
  } = props;
  const {requestState, data: carouselsList, error} = carouselsData;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <Box>
      {requestState === LOADED &&
        error === null &&
        carouselsList &&
        carouselsList.length > 0 &&
        carouselsList.map((carousel, index) => {
          return <CarouselShelfRow key={index}
                                   index={index}
                                   carousel={carousel}
                                   cardMarginEnd={cardMarginEnd}
                                   prefersDarkMode={prefersDarkMode}
                                   getCardID={getCardID}
                                   cardBaseWidth={cardBaseWidth}
                                   cardBaseHeight={cardBaseHeight}
                                   itemVariant={itemVariant}
                                   onItemClick={onItemClick}/>;
        })}
    </Box>
  );
});

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
  itemVariant: PropTypes.oneOf([CAROUSEL_ITEM_VARIANT.MOVIE, CAROUSEL_ITEM_VARIANT.TRAILER, CAROUSEL_ITEM_VARIANT.COVER_PHOTO]).isRequired,
  onItemClick: PropTypes.func
};

export default CarouselsShelf;
