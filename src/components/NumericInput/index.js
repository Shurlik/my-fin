import React, { useState } from "react";
import "./index.scss";

const NumericInput = ({ min, max, initialValue, step, digits, func }) => {
    const [counter, setCounter] = useState(initialValue);

    const decrease = () => {
        if (counter - step < min) return;
        func(counter - step);
        setCounter((prevValue) => prevValue - step);
    };

    const increase = () => {
        if (counter + step > max) return;
        func(counter + step);
        setCounter((prevValue) => prevValue + step);
    };

    // const onchange = (e) => { // for future if need
    //     const check = e.target.value < min || e.target.value > max || isNaN(parseFloat(e.target.value));
    //     if (check) return;
    //     setCounter(parseFloat(e.target.value));
    // }

    const rounded = (number) => {
        return parseFloat(number).toFixed(digits);
    };

    return (
        <div className={"numeric"}>
            <button type={"button"} className="numeric__btn" onClick={decrease}>
                -
            </button>
            <input
                type="text"
                className={"numeric__input"}
                value={rounded(counter)}
                disabled={true}
            />
            <button type={"button"} className="numeric__btn" onClick={increase}>
                +
            </button>
        </div>
    );
};

export default NumericInput;
