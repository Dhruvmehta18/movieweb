import {LOADING} from "../constants/constants";

const getCarouselsShelfList = store => store.carouselShelf
const getAdvCarouselList = store => store.advCarousel
const getMovieById = (store, movie_id) => store.movie_detail.find((movie) => movie.data.id === movie_id)
const isMoviePresent = (store, movie_id) => {
    const movie = store.movie_detail.some((movie) => movie.data.id === movie_id);
    if (movie) {
        return movie;
    } else {
        return {
            requestState: LOADING,
            data: {},
            error: null
        }
    }
}

export {
    getCarouselsShelfList,
    getAdvCarouselList,
    getMovieById,
    isMoviePresent
}
