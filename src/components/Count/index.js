import React, {useState} from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import CountOperations from "../CountOperations";

const Count = ({ uuid, balance, name, currency }) => {
    const [showOperations, setShowOperations] = useState(false)

    const closeShowOperations = () => {
        setShowOperations(false);
    }

    const countBtnAction=()=>{
        setShowOperations(true)
    }

    return (
        <div className="count">
            <div className="count__title">{name}</div>
            <div className={"count__body"}>
                <Link className={"count__link"} to={`/${name}`}>
                    <div className="count__number">{uuid}</div>
                </Link>
                <div className="count__balance">
                    <span className="count__balance--text">Balance:&nbsp;</span>
                    {balance}
                    <span className={"count__currency"}>&nbsp;{currency}</span>
                </div>
            </div>
            {showOperations && <CountOperations close={closeShowOperations} uuid={uuid}/>}
            <button className={"count__btn"} onClick={countBtnAction}>Operations</button>
        </div>
    );
};

export default Count;
