// Component for prepare each Count to list in Counts component
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CountOperations from "../CountOperations";
import "./index.scss";

const Count = ({ uuid, balance, name, currency }) => {
    const [showPutOperations, setShowPutOperations] = useState(false);
    const [showWithdrawOperations, setShowWithdrawPutOperations] = useState(
        false
    );

    const closeShowPutOperations = () => {
        setShowPutOperations(false);
    };

    const countBtnActionPut = () => {
        setShowPutOperations(true);
    };
    const closeShowWithdrawOperations = () => {
        setShowWithdrawPutOperations(false);
    };

    const countBtnActionWithdraw = () => {
        setShowWithdrawPutOperations(true);
    };

    return (
        <div className="count">
            <div className="count__title">{name}</div>
            <div className={"count__body"}>
                <Link className={"count__link"} to={`/counts/${name}`}>
                    <div className="count__number">{uuid}</div>
                </Link>
                <div className="count__balance">
                    <span className="count__balance--text">Balance:&nbsp;</span>
                    {balance}
                    <span className={"count__currency"}>&nbsp;{currency}</span>
                </div>
            </div>
            {showPutOperations && ( //show modal with adding money
                <CountOperations
                    close={closeShowPutOperations}
                    uuid={uuid}
                    operation={true}
                />
            )}
            {showWithdrawOperations && ( //show modal with getting money
                <CountOperations
                    close={closeShowWithdrawOperations}
                    uuid={uuid}
                    operation={false}
                />
            )}
            <button className={"count__btn btn"} onClick={countBtnActionPut}>
                Put
            </button>
            <button
                className={"count__btn btn"}
                onClick={countBtnActionWithdraw}
            >
                Withdraw
            </button>
        </div>
    );
};

export default Count;
