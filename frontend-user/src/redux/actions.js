import axios from "axios";
import * as actionTypes from './actionTypes';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const setCarouselsShelfList = (carouselList) => {
    return {type: actionTypes.ADD_CAROUSELS_SHELF, carouselList: [...carouselList]};
}

const loadingCarouselsShelfList = () => {
    return {type: actionTypes.LOADING_CAROUSELS_SHELF, carouselList: {}};
}

const errorCarouselsShelfList = (error) => {
    return {type: actionTypes.ERROR_CAROUSELS_SHELF, error: error};
}

const setAdvCarouselsShelfList = (carouselList = []) => {
    return {type: actionTypes.ADD_ADV_CAROUSEL_LIST, advCarouselList: carouselList};
}

const loadingAdvCarouselsShelfList = () => {
    return {type: actionTypes.LOADING_ADV_CAROUSEL_LIST, advCarouselList: {}};
}

const errorAdvCarouselsShelfList = (error) => {
    return {type: actionTypes.ERROR_ADV_CAROUSEL_LIST, error: error};
}

const addMovieObject = (movie = {}) => {
    return {type: actionTypes.ADD_MOVIE, movie: {...movie}};
}

const loadingMovie = () => {
    return {type: actionTypes.LOADING_MOVIE, advCarouselList: {}};
}

const errorMovie = (error) => {
    return {type: actionTypes.ERROR_MOVIE, error: error};
}

function addCarouselShelfList() {
    loadingCarouselsShelfList();
    return dispatch => {
        axios
            .get("http://localhost:8000/predictions-home", {cancelToken: source.token})
            .then((response) => {
                const data = response.data.carousel_list;
                dispatch(setCarouselsShelfList([...data]));
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    // handle error
                    console.log(error);
                }
                errorCarouselsShelfList({error});
            });
        // setTimeout(() => {
        //     const data = jsonData
        //     dispatch(setCarouselsShelfList([{title: 'Movies', list: data}, {title: 'Movies 2', list: data}]));
        // }, 2000);

    };
}

const addAdvCarouselList = ()=>{
    loadingAdvCarouselsShelfList();
    return dispatch => {
        axios
            .get("http://localhost:8000/adv-carousels", {cancelToken: source.token})
            .then((response) => {
                const data = response.data.adv_carousel
                dispatch(setAdvCarouselsShelfList([...data]));
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    // handle error
                    console.log(error);
                }
                errorAdvCarouselsShelfList({error});
            });
        // setTimeout(() => {
        //     const data = carouselData
        //     dispatch(setAdvCarouselsShelfList([...data]));
        // }, 2000);
    };
}

const addMovie = (movieId) => {
    // if(!isMoviePresent(movieId)){
    loadingMovie();
    return dispatch => {
        axios
            .get("http://localhost:8000/detail/data/", {params: {movieId: movieId}, cancelToken: source.token})
            .then((response) => {
                console.log(response)
                const movie = response.data.movie
                dispatch(addMovieObject({...movie}));
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    // handle error
                    console.log(error);
                }
                errorMovie({error});
            });
        // setTimeout(() => {
        //     const data = carouselData
        //     dispatch(setAdvCarouselsShelfList([...data]));
        // }, 2000);
    };
    // }
}

export {
    addCarouselShelfList,
    addAdvCarouselList,
    addMovie
}
