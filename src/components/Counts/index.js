import React from 'react';
import Count from "../Count";
import {useSelector} from "react-redux";
import CountCreation from "../CountCreation"

const Counts = () => {
    const counts = useSelector(state => state.countsData.counts)

    const countsItems = counts.map(count => {
        return (
            <Count uuid={count.uuid}
                   balance={count.balance}
                   name={count.name}
                   currency={count.currency}
                   transactions={count.transactions}
                   key={count.uuid}
            />
        )
    })
    return (
        <div className={"counts"}>
            {countsItems}
            <CountCreation />
        </div>
    );
};

export default Counts;
