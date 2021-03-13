import React from 'react';
import "./index.scss"
const Transactions = ({transaction}) => {
    const {withdraw, sum, date, comment} = transaction;
    const label = withdraw ? "IN" : "OUT";
    let [sDate, sTime] = new Date(date).toISOString().split("T");
    sTime = sTime.split(".")[0];

    return (
        <div className={"transactions"}>
            <span className="transactions__date">Time:&nbsp;{sTime}&nbsp;{sDate}</span>&nbsp;|&nbsp;
            <span className="transactions__sum">Summa:&nbsp;{sum}</span>&nbsp;|&nbsp;
            <span className="transactions__label">Type:&nbsp;{label}</span>&nbsp;|&nbsp;
            <span className="transactions__comment">Comment:&nbsp;{comment}</span>
            <div className="transactions__underline"></div>
        </div>
    );
};

export default Transactions;
