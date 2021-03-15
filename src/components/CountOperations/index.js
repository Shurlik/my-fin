// Component for put or take money from count. Shows like Modal. Contain NumericInput component.
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCounts, saveTransactions } from "../../store/Counts/actions";
import NumericInput from "../NumericInput";
import "./index.scss";

const CountOperations = ({ uuid, close, operation }) => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [sum, setSum] = useState("");

    const counts = useSelector((state) => state.countsData.counts);
    const transactions = useSelector((state) => state.countsData.transactions);

    const count = counts.find( // Getting current Count here
        (c) => c.uuid.toUpperCase() === uuid.toUpperCase()
    );
    const currentTransactions = transactions[uuid];

    const commentOnchange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        writeToTransaction();
        setComment("");
        setSum("");
    };

    const writeToTransaction = () => {
        const tmpTransaction = {};
        tmpTransaction.id = currentTransactions // Generate new ID for new transaction
            ? currentTransactions[currentTransactions.length - 1].id + 1
            : 1;
        tmpTransaction.date = new Date().getTime(); // Date in ms
        tmpTransaction.sum = sum;
        tmpTransaction.withdraw = !operation; // check for Put or Take money
        tmpTransaction.comment = comment;
        if (operation) {
            count.balance += +sum;
        } else {
            count.balance += +sum * -1;
        }
        addTransaction(tmpTransaction);
        dispatch(saveCounts([...counts]));
        close();
    };

    const addTransaction = (obj) => {
        if (!obj.sum) return;
        if (currentTransactions) {
            currentTransactions.push(obj);
        } else {
            transactions[uuid] = [obj];
        }
        dispatch(saveTransactions({ ...transactions }));
    };

    return (
        <div className={"overlay"}>
            <div className="overlay__inner">
                <p className="countOperations__sum--title">Your Balance:</p>
                <div className="countOperations__sum">{count.balance}</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className="countOperations__input--title">
                            Enter your sum:
                        </p>
                        <NumericInput
                            min={0}
                            max={1000}
                            initialValue={0}
                            step={10}
                            digits={0}
                            func={setSum}
                        />
                    </div>
                    <div>
                        <p className={"countOperations__textarea--title"}>
                            Your comment:
                        </p>
                        <textarea
                            className={"countOperations__textarea"}
                            onChange={commentOnchange}
                            value={comment}
                            maxLength={200}
                        />
                    </div>
                    <input
                        className={"countOperations__btn btn"}
                        type={"submit"}
                        value={"Ok"}
                    />
                    <button
                        className={"countOperations__btn btn"}
                        value={"cancel"}
                        onClick={(e) => {
                            e.preventDefault(); //to remove warning message
                            close();
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CountOperations;
