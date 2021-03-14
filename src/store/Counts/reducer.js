import {
    SAVE_COUNTS,
    SAVE_TRANSACTIONS,
    COUNTS_LOADED,
    TRANSACTIONS_LOADED,
} from "./actions";

const defaultState = {
    counts: null,
    transactions: null,
    countsLoaded: false,
    transactionsLoaded: false,
};

export const countsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_COUNTS:
            return { ...state, counts: action.payload };
        case SAVE_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        case COUNTS_LOADED:
            return { ...state, countsLoaded: action.payload };
        case TRANSACTIONS_LOADED:
            return { ...state, transactionsLoaded: action.payload };
        default:
            return state;
    }
};
