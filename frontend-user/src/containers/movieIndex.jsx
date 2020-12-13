import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import CarouselsShelf from "../components/CarouselShelf/CarouselsShelf";
import { addCarouselShelfList } from "../redux/actions";
import { getCarouselsShelfList } from "../redux/selectors";

function mapStateToProps(state) {
  return { carouselsList: getCarouselsShelfList(state) };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserMovies: () => dispatch(addCarouselShelfList()),
  };
};

const MovieIndex = (props) => {
  const { getUserMovies, carouselsList } = props;
  useEffect(() => {
    getUserMovies();
  }, [getUserMovies, carouselsList.requestState]);
  return (
    <Box>
      <Box>
        <CarouselsShelf carouselsList={carouselsList} />
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieIndex);
