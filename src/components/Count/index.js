import React from 'react';
import "./index.scss"
import {Link} from "react-router-dom";

const Count = ({uuid, balance, name, currency}) => {
    return (
        <div className="count">
            <div className="count__title">{name}</div>
            <div className={"count__body"}>
                <Link className={"count__link"} to={`/${name}`}>
                    <div className="count__number">{uuid}</div>
                </Link>
                <div className="count__balance"><span className="count__balance--text">Balance:&nbsp;</span>{balance}
                    <span className={"count__currency"}>&nbsp;{currency}</span></div>
            </div>
        </div>
    );
};

export default Count;
