import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import CarouselsShelf from "../components/CarouselShelf/CarouselsShelf";
import { addCarouselShelfList, addAdvCarouselList } from "../redux/actions";
import { getCarouselsShelfList, getAdvCarouselList } from "../redux/selectors";
import AdvCarousel from "../components/AdvCarousel/AdvCarousel";

function mapStateToProps(state) {
  return { 
    carouselsList: getCarouselsShelfList(state) ,
    advCarouselList: getAdvCarouselList(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserMovies: () => dispatch(addCarouselShelfList()),
    getUserAdvCarousel: () => dispatch(addAdvCarouselList())
  };
};

const MovieIndex = (props) => {
  const { getUserMovies, getUserAdvCarousel,carouselsList, advCarouselList } = props;
  useEffect(() => {
    getUserMovies();
    getUserAdvCarousel();
  }, [getUserMovies, getUserAdvCarousel, carouselsList.requestState, advCarouselList.requestState ]);
  return (
    <Box>
      <Box>
        <AdvCarousel advCarouselList={advCarouselList}/>
        <CarouselsShelf carouselsList={carouselsList} />
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieIndex);
