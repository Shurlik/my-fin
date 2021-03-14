import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import "./index.scss"
import {saveCounts, saveTransactions} from "../../store/Counts/actions"

const CountOperations = ({uuid, close}) => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [sum, setSum] = useState(0);
    const [withdraw, setWithdraw] = useState(false);

    const counts = useSelector((state) => state.countsData.counts);
    const transactions = useSelector(state => state.countsData.transactions);

    const count = counts.find(c => c.uuid.toUpperCase() === uuid.toUpperCase())
    const currentTransactions = transactions[uuid];

    const sunOnchange = (e) => {
        setSum(+e.target.value)
    }
    const commentOnchange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        writeToTransaction();
        setComment("")
        setSum(0)
    }

    const writeToTransaction = () => {
        const tmpTransaction = {};
        tmpTransaction.id = currentTransactions ? currentTransactions[currentTransactions.length - 1].id + 1 : 1;
        tmpTransaction.date = new Date().getTime();
        tmpTransaction.sum = sum;
        tmpTransaction.withdraw = withdraw;
        tmpTransaction.comment = comment;
        writeToCount(sum, count, withdraw)
        addTransaction(tmpTransaction);
        dispatch(saveCounts([...counts]));
        close();
    }

    const addTransaction = (obj) => {
        if (currentTransactions) {
            currentTransactions.push(obj);
        } else {
            transactions[uuid] = [obj];
        }
        dispatch(saveTransactions({...transactions}))
    }

    const writeToCount = (sum, count, withdraw) => {
        console.log(withdraw)
        if (!withdraw) {
            count.balance = count.balance + sum;
        } else {
            count.balance = count.balance - sum;
        }
    }

    const onRadioChange = (e)=>{
        setWithdraw(e.target.value)
    }

    return (
        <div className={"overlay"}>
            <div className="overlay__inner">
                <div className="countOperations__sum">{count.balance}</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="radio"
                        name={"withdraw"}
                        value={false}
                        onChange={onRadioChange}
                        // checked={true}
                    /> Put money
                    <input
                        type="radio"
                        name={"withdraw"}
                        value={true}
                        onChange={onRadioChange}
                /> Withdraw money
                    <div>
                        <input type="number" value={sum} onChange={sunOnchange}/>
                    </div>
                    <div>
                        <textarea className={"countOperations__textarea"} onChange={commentOnchange} value={comment}/>
                    </div>
                    <input type={"submit"} value={"Ok"}/>
                    <button value={"cancel"} onClick={close}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CountOperations;
