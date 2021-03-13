import axios from "axios"

export const SAVE_COUNTS = "SAVE_COUNTS"
export const SAVE_TRANSACTIONS = "SAVE_TRANSACTIONS"
export const COUNTS_LOADED = "COUNTS_LOADED"
export const TRANSACTIONS_LOADED = "TRANSACTIONS_LOADED"
const API = "../../data"

export const loadCounts = () => (dispatch) => {
    countsLoaded(false);
    axios(API + "/counts.json")
        .then(res => dispatch(saveCounts(res.data)))
        .then(() => dispatch(countsLoaded(true)))
}

export const loadTransactions = () => (dispatch) => {
    transactionsLoaded(false)
    axios(API + "/transactions.json")
        .then(res => dispatch(saveTransactions(res.data)))
        .then(() => dispatch(transactionsLoaded(true)))
}

export const saveCounts = (counts) => (dispatch) => {
    dispatch({
        type: SAVE_COUNTS,
        payload: counts,
    });
};

export const saveTransactions = (transactions) => (dispatch) => {
    dispatch({
        type: SAVE_TRANSACTIONS,
        payload: transactions,
    });
};

export const countsLoaded = (loaded) => (dispatch) => {
    dispatch({
        type: COUNTS_LOADED,
        payload: loaded,
    });
};
export const transactionsLoaded = (loaded) => (dispatch) => {
    dispatch({
        type: TRANSACTIONS_LOADED,
        payload: loaded,
    });
};