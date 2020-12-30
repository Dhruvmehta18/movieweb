// import axios from "axios";
import * as actionTypes from './actionTypes';
import jsonData from "../rawdata/movies.json"
import carouselData from "../rawdata/carousel.json";

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const setCarouselsShelfList = (carouselList) => {
    return {type: actionTypes.ADD_CAROUSELS_SHELF, carouselList: [...carouselList]};
}

const loadingCarouselsShelfList = () => {
    return {type: actionTypes.LOADING_CAROUSELS_SHELF, carouselList: {}};
}

// const errorCarouselsShelfList = (error) => {
//     return {type: actionTypes.ERROR_CAROUSELS_SHELF, error: error};
// }

const setAdvCarouselsShelfList = (carouselList = []) => {
    return {type: actionTypes.ADD_ADV_CAROUSEL_LIST, advCarouselList: carouselList};
}

const loadingAdvCarouselsShelfList = () => {
    return {type: actionTypes.LOADING_ADV_CAROUSEL_LIST, advCarouselList: {}};
}

// const errorAdvCarouselsShelfList = (error) => {
//     return {type: actionTypes.ERROR_ADV_CAROUSEL_LIST, error: error};
// }

function addCarouselShelfList(){
    loadingCarouselsShelfList();
    return dispatch => {
        // axios
        //     .get("/movies", {cancelToken: source.token })
        //     .then((response) => {
        //         console.log(response);
        //         const data = response.data.data.about;
        //         dispatch(setCarouselsShelfList([{ ...data }]));
        //     })
        //     .catch((error) => {
        //         if (axios.isCancel(error)) {
        //             console.log('Request canceled', error.message);
        //         } else {
        //             // handle error
        //             console.log(error);
        //         }
        //         errorCarouselsShelfList({error});
        //     });
        setTimeout(() => {
            const data = jsonData
            dispatch(setCarouselsShelfList([{title: 'Movies', list: data}, {title: 'Movies 2', list: data}]));
        }, 2000);

    };
}

const addAdvCarouselList = ()=>{
    loadingAdvCarouselsShelfList();
    return dispatch => {
        // axios
        //     .get("/movies", {cancelToken: source.token })
        //     .then((response) => {
        //         console.log(response);
        //         const data = response.data.data.about;
        //         dispatch(setCarouselsShelfList([{ ...data }]));
        //     })
        //     .catch((error) => {
        //         if (axios.isCancel(error)) {
        //             console.log('Request canceled', error.message);
        //         } else {
        //             // handle error
        //             console.log(error);
        //         }
        //         errorCarouselsShelfList({error});
        //     });
        setTimeout(() => {
            const data = carouselData
            dispatch(setAdvCarouselsShelfList([...data]));
        }, 2000);
    };
}

export {
    addCarouselShelfList,
    addAdvCarouselList
}
