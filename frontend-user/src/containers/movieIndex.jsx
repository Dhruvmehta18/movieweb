import React from "react";
import { Box } from "@material-ui/core";
import CarouselsShelf from "../components/CarouselShelf/CarouselsShelf";
import AdvCarouselContainer from "../components/AdvCarousel/AdvCarousel";

const MovieIndex = (props) => {
  return (
    <Box>
      <Box>
        <AdvCarouselContainer />
        <CarouselsShelf />
      </Box>
    </Box>
  );
};

export default MovieIndex;
