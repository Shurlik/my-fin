import React, {useState} from "react";
import Count from "../Count";
import {useSelector} from "react-redux";
import CountCreation from "../CountCreation";

import "./index.scss"

const Counts = () => {
    const counts = useSelector((state) => state.countsData.counts);
    const [showCreation, setShowCreation] = useState(false)

    const addCountBtn = () => {
        setShowCreation(true)
    }

    const closeShowCreation = () => {
        setShowCreation(false);
    }

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
            {countsItems}
            <div className="counts__add">
                <button onClick={addCountBtn}>Create new count</button>
            </div>
            {showCreation && <CountCreation close={closeShowCreation}/>}

        </div>
    );
};

export default Counts;
