// Here we saving and loading data to/from Storage.
// It's no any cleaner for Storage for now in this App.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loadCounts,
    loadTransactions,
    countsLoaded,
    transactionsLoaded,
    saveCounts,
    saveTransactions,
} from "./store/Counts/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "./Routes";
import "./App.css";

function App() {
    const countsIsLoaded = useSelector(
        (state) => state.countsData.countsLoaded
    );
    const transactionsIsLoaded = useSelector(
        (state) => state.countsData.transactionsLoaded
    );
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);

    const counts = useSelector((state) => state.countsData.counts);
    const transactions = useSelector((state) => state.countsData.transactions);

    const storeData = async (value, key) => { // Saving to Store
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    const getData = async (key) => { //Getting from Store
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (countsIsLoaded && transactionsIsLoaded) {
            setLoaded(true);
        }
    }, [countsIsLoaded, transactionsIsLoaded]);

    useEffect(() => { // Data loading from file if Storage is empty - in /Store/Counts actions
        getData("counts").then((res) => {
            if (res === null) {
                dispatch(loadCounts());
            } else {
                dispatch(saveCounts(res));
                dispatch(countsLoaded(true));
            }
        });

        getData("transactions").then((res) => {
            if (res === null) {
                dispatch(loadTransactions());
            } else {
                dispatch(saveTransactions(res));
                dispatch(transactionsLoaded(true));
            }
        });
    }, [dispatch]);

    useEffect(() => { // Saving Counts to Storage on Change
        storeData(counts, "counts");
    }, [counts]);

    useEffect(() => { // Saving Transactions to Storage on Change
        storeData(transactions, "transactions");
    }, [transactions]);

    return (
        <div className="App">
            {!loaded && <h2>loading...</h2>}
            {loaded && <Routes />}
        </div>
    );
}

export default App;
