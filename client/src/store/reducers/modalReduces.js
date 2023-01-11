import {
    MODAL_COMMON,
    MODAL_SPARE,
    MODALS_GET,
} from "../types/typesModal";

const initialState = {

    modal: {
        common: false,
        spare: false,
    },
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODALS_GET:
            return {
                ...state,
                modal: action.payload,
                loading: true,
            };
        case MODAL_COMMON:
            return {
                ...state,
                common: action.payload,
            };
        case MODAL_SPARE:
            return {
                ...state,
                spare: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default modalReducer;