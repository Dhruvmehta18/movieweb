import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import "./Carouselsitems.css";
import CarouselShelfItemFactory from "../../CarouselShelfItemFactory";
import { CAROUSEL_ITEM_VARIANT } from "../../../constants/constants";

const CarouselsShelfItems = (props) => {
  const {
    carousel,
    carouselRef,
    dark,
    getCardID,
    cardWidth,
    cardHeight,
    itemVariant,
    onItemClick
  } = props;
  return (
    <Box width="100%">
      <Grid
        container
        wrap="nowrap"
        className="carousels-container"
        ref={carouselRef}
      >
        {carousel.list.map((value) => {
          return (
            <CarouselShelfItemFactory
              key={getCardID(value)}
              itemVariant={itemVariant}
              item={value}
              dark={dark}
              width={cardWidth}
              height={cardHeight}
              onItemClick={onItemClick}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

CarouselsShelfItems.propTypes = {
  carousel: PropTypes.any.isRequired,
  carouselRef: PropTypes.any.isRequired,
  dark: PropTypes.bool,
  getCardID: PropTypes.func.isRequired,
  itemVariant: PropTypes.oneOf([CAROUSEL_ITEM_VARIANT.MOVIE, CAROUSEL_ITEM_VARIANT.TRAILER]).isRequired,
  onItemClick: PropTypes.func
};

export default CarouselsShelfItems;
