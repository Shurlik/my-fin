// Shows list of Counts
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Count from "../Count";
import CountCreation from "../CountCreation";
import "./index.scss";

const Counts = () => {
    const counts = useSelector((state) => state.countsData.counts);
    const [showCreation, setShowCreation] = useState(false);

    const addCountBtn = () => {
        setShowCreation(true);
    };

    const closeShowCreation = () => {
        setShowCreation(false);
    };

    const countsItems = counts.map((count) => {
        return (
            <Count
                uuid={count.uuid}
                balance={count.balance}
                name={count.name}
                currency={count.currency}
                transactions={count.transactions}
                key={count.uuid}
            />
        );
    });
    return (
        <div className={"counts"}>
            <div className="counts__add">
                <button onClick={addCountBtn}>Create new count</button>
            </div>
            <h2>Your Counts:</h2>
            {countsItems}
            {showCreation && <CountCreation close={closeShowCreation} />}
        </div>
    );
};

export default Counts;
