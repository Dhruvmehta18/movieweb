import React, {useCallback, useEffect} from "react";
import {Box} from "@material-ui/core";
import CarouselsShelf from "../components/CarouselShelf/CarouselsShelf";
import AdvCarouselContainer from "../components/AdvCarousel/AdvCarousel";
import {connect} from "react-redux";
import {addCarouselShelfList} from "../redux/actions";
import {getCarouselsShelfList} from "../redux/selectors";
import {CAROUSEL_ITEM_VARIANT} from "../constants/constants";
import withHeader from "../hoc/withHeader";

const MovieIndex = (props) => {
  const {getUserMovies, carouselsData} = props;

  const style = getComputedStyle(document.body);

  const movieCardBaseWidth = parseInt(
      style.getPropertyValue("--movie-card-width")
  );

  const movieCardBaseHeight = parseInt(
    style.getPropertyValue("--movie-card-height")
  );

  const movieCardMarginEnd = parseInt(
    style.getPropertyValue("--movie-card-margin-end")
  );

  const getCardID = useCallback((value) => {
    return value.id;
  }, []);

  useEffect(() => {
    getUserMovies();
  }, [getUserMovies]);
  return (
    <Box>
      <Box>
        <AdvCarouselContainer />
        <CarouselsShelf
          carouselsData={carouselsData}
          cardBaseWidth={movieCardBaseWidth}
          cardBaseHeight={movieCardBaseHeight}
          cardMarginEnd={movieCardMarginEnd}
          getCardID={getCardID}
          itemVariant={CAROUSEL_ITEM_VARIANT.MOVIE}
        />
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    carouselsData: getCarouselsShelfList(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserMovies: () => dispatch(addCarouselShelfList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withHeader(MovieIndex));
