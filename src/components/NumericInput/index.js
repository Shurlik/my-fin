import React, {useState} from 'react';
import "./index.scss";

const NumericInput = ({min, max, initialValue, step, digits}) => {
    const [counter, setCounter] = useState(initialValue);

    const decrease = () => {
        if ((counter - step) < min) return;
        setCounter(prevValue => prevValue - step);
    }

    const increase = () => {
        if ((counter + step) > max) return;
        setCounter(prevValue => prevValue + step);
    }

    const onchange = (e) => {
        const check = e.target.value < min || e.target.value > max || isNaN(parseFloat(e.target.value));
        if (check) return;
        setCounter(parseFloat(e.target.value));
    }

    const rounded = (number)=>{
            return parseFloat(number).toFixed(digits);
    }

    return (
        <div className={"numeric"}>
            <button className="numeric__btn" onClick={decrease}>-</button>
            <input type="text" className={"numeric__input"} value={rounded(counter)} onChange={onchange}/>
            <button className="numeric__btn" onClick={increase}>+</button>
        </div>
    );
};

export default NumericInput;