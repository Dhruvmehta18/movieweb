import axios from "axios";
import * as actionTypes from './actionTypes';
import jsonData from "../rawdata/movies.json"

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function setCarouselsShelfList(carouselList){
    return {type: actionTypes.ADD_CAROUSELS_SHELF, carouselList: [...carouselList]};
}

function loadingCarouselsShelfList(){
    return {type: actionTypes.LOADING_CAROUSELS_SHELF, carouselList: {}};
}

function errorCarouselsShelfList(error){
    return {type: actionTypes.ERROR_CAROUSELS_SHELF, error: error};
}

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
            dispatch(setCarouselsShelfList([{title:'Movies', list: data }]));
        }, 1000);
        
    };
}

export {
    addCarouselShelfList
}