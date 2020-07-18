import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const PLACES_REQUEST = 'PLACES_REQUEST';
export const PLACES_SUCCESS = 'PLACES_SUCCESS';
export const PLACES_FAILURE = 'PLACES_FAILURE';

export const GET_PLACES_REQUEST = 'GET_PLACES_REQUEST';
export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';
export const GET_PLACES_FAILURE = 'GET_PLACES_FAILURE';


export const GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS';



export const PUT_PLACES_REQUEST = 'PUT_PLACES_REQUEST';
export const PUT_PLACES_SUCCESS = 'PUT_PLACES_SUCCESS';
export const PUT_PLACES_FAILURE = 'PUT_PLACES_FAILURE';

export const fetchPostRequest = () => ({type: PLACES_REQUEST});
export const fetchPostSuccess = () => ({type: PLACES_SUCCESS});
export const fetchPostFailure = error => ({type: PLACES_FAILURE, error});

export const getRecipesSuccess = (data) => ({type: GET_RECIPES_SUCCESS,data});


export const getRequest = () => ({type: GET_PLACES_REQUEST});
export const getSuccess = data => ({type: GET_PLACES_SUCCESS, data});
export const getFailure = error => ({type: GET_PLACES_FAILURE, error});

export const putRequest = () => ({type: PUT_PLACES_REQUEST});
export const putSuccess = () => ({type: PUT_PLACES_SUCCESS});
export const putFailure = error => ({type: PUT_PLACES_FAILURE, error});


export const postPlaces = (data) => {
    return async dispatch => {
        try {
            dispatch(fetchPostRequest());
            const response = await axiosApi.post('/recipe', data);
            dispatch(fetchPostSuccess());
            dispatch(push('/recipe/' + response.data._id))
        } catch (e) {
            dispatch(fetchPostFailure(e?.response ?? e))
        }


    }
};

export const putPlaces = (id, data) => {
    return async dispatch => {
        try {
            dispatch(putRequest());
            await axiosApi.put('/places/' + id, data);
            dispatch(putSuccess());
            dispatch(getPlaces(id))
        } catch (e) {
            dispatch(putFailure(e?.response ?? e))
        }
    }
};

export const getPlaces = (id) => {
    return async dispatch => {
        try {
            dispatch(getRequest());
            const response = await axiosApi.get('/places/' + id);
            dispatch(getSuccess(response.data));

        } catch (e) {
            dispatch(getFailure(e?.response ?? e))
        }


    }
};

export const getRecipes = () => {
    return async dispatch => {
        try {
            dispatch(getRequest());
            const response = await axiosApi.get('/places');
            dispatch(getRecipesSuccess(response.data));

        } catch (e) {
            dispatch(getFailure(e?.response ?? e))
        }
    }
};

export const deletePlaces = (id) => {
    return async (dispatch) => {
        await axiosApi.delete('/places/' + id);
        dispatch(getRecipes());
    }
};
