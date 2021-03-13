import {combineReducers} from "redux";
import {countsReducer} from "./Counts/reducer"

export default combineReducers({
    countsData: countsReducer
})