import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import CarouselsShelfItem from "./CarouselsShelfItem/CarouselsShelfItem";
import "./Carouselsitems.css";

const CarouselsShelfItems = (props) => {
  const { carousel, carouselRef, dark } = props;
  return (
    <Box width="100%">
      <Grid
        container
        wrap="nowrap"
        className="carousels-container"
        ref={carouselRef}
      >
        {carousel.list.map((movie, index) => {
          return <CarouselsShelfItem key={movie.id} movie={movie} dark={dark}/>;
        })}
      </Grid>
    </Box>
  );
};

CarouselsShelfItems.propTypes = {
  carousel: PropTypes.any,
  carouselRef: PropTypes.any,
  dark: PropTypes.bool
};

export default CarouselsShelfItems;
