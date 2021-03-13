import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadCounts, loadTransactions} from "./store/Counts/actions"
import Routes from "./Routes";

import './App.css';


function App() {
    const loaded = useSelector(state => state.countsData.countsLoaded)
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(loadCounts());
            dispatch(loadTransactions());
        }, [dispatch])


    return (
        <div className="App">
            {!loaded && <h2>loading...</h2>}
            {loaded && <Routes />}
        </div>
    );
}

export default App;
