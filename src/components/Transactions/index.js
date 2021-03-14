// Formatting Transactions list for CountDetailed
import React from "react";
import "./index.scss";

const Transactions = ({transaction}) => {
    const {withdraw, sum, date, comment} = transaction;
    const label = withdraw ? "OUT" : "IN"; // Put/Take label
    const sDate = new Date(date).toString().split(" ");
    const sTime = sDate[4] + " " + sDate[2] + "-" + sDate[1] + "-" + sDate[3] // Formatting Date to show in Transactions

    return (
        <div className={"transactions"}>
            <span className="transactions__date">
                Time:&nbsp;{sTime}
            </span>
            &nbsp;|&nbsp;
            <span className="transactions__sum">Summa:&nbsp;{sum}</span>
            &nbsp;|&nbsp;
            <span className="transactions__label">Type:&nbsp;{label}</span>
            &nbsp;|&nbsp;
            <span className="transactions__comment">
                Comment:&nbsp;{comment}
            </span>
            <div className="transactions__underline"></div>
        </div>
    );
};

export default Transactions;
