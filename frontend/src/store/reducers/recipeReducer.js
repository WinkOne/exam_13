import {
    GET_PLACES_FAILURE,
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS, PUT_PLACES_FAILURE, PUT_PLACES_REQUEST, PUT_PLACES_SUCCESS,
    PLACES_FAILURE,
    PLACES_REQUEST,
    PLACES_SUCCESS, GET_RECIPES_SUCCESS
} from "../actions/recipeAction";

const initialState = {
    recipes: [],
    recipe: {},
    error: null,
    loading: false
};

const recipeReducer = (state = initialState, action) => {

    switch (action.type) {
        case PLACES_REQUEST:
            return {...state, loading: true};
        case PLACES_SUCCESS:
            return {...state, loading: false};
        case PLACES_FAILURE:
            return {...state, loading: false, error: action.error};
        case GET_PLACES_REQUEST:
            return {...state, loading: true};
        case GET_PLACES_SUCCESS:
            return {...state, loading: false, recipe: action.data};
        case GET_PLACES_FAILURE:
            return {...state, loading: false, error: action.error};
        case PUT_PLACES_REQUEST:
            return {...state, loading: true};
        case PUT_PLACES_SUCCESS:
            return {...state, loading: false};
        case PUT_PLACES_FAILURE:
            return {...state, loading: false, error: action.error};
        case GET_RECIPES_SUCCESS:
            return {...state, recipes: action.data, loading: false};

        default:
            return state

    }

};

export default recipeReducer;