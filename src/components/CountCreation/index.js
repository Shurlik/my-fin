// Component for Count creation. Shows like Modal window
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCounts } from "../../store/Counts/actions";
import "./index.scss";

const CountCreation = ({ close }) => {
    const dispatch = useDispatch();
    const counts = useSelector((state) => state.countsData.counts);

    const [uuid, setUuid] = useState("UA");
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(true);
    const [errorText, setErrorText] = useState("");
    const reg = /^[A-Za-z]{2}[0-9]{27}$/; // For UUID simple checking

    const checks = () => {
        const error = counts.some((count) => {
            return (
                count.uuid.toUpperCase() === uuid.toUpperCase() ||
                count.name.toUpperCase() === name.toUpperCase()
            );
        });
        if (error) {
            setErrorText("The UUID or Name are not uniq!");
            setSuccess(false);
        }
        return error;
    };

    const uuidOnchange = (e) => {
        setUuid(e.target.value);
        if (reg.test(e.target.value)) {
            setSuccess(true);
        }
    };

    const nameOnchange = (e) => {
        setName(e.target.value);
        setSuccess(true);
    };

    const addNewCount = (name, uuid) => {
        const newCount = {
            uuid: uuid,
            name: name,
            balance: 0,
            currency: "uah",
        };
        dispatch(saveCounts([...counts, newCount]));
    };

    const cancelBtn = (e) => {
        e.preventDefault();
        close();
        setUuid("UA");
        setName("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checks()) {
            return;
        }
        if (reg.test(uuid)) {
            setSuccess(true);
            addNewCount(name, uuid);
            setUuid("UA");
            setName("");
            close();
        } else {
            setSuccess(false);
            setErrorText("Should contain 2 letters and 29 digits.");
        }
    };

    return (
        <div className={"overlay"}>
            <div className={"countCreate overlay__inner"}>
                <form onSubmit={handleSubmit}>
                    <div className={"countCreate__input"}>
                        Count name (max: 10):
                    </div>
                    <div className="countCreate__input--name">
                        <input
                            type="text"
                            maxLength={"10"}
                            value={name}
                            onChange={nameOnchange}
                            required
                        />
                    </div>
                    <div className={"countCreate__input"}>
                        Count UUID (max: 29):
                    </div>
                    <div className="countCreate__input--uuid">
                        <input
                            type="text"
                            maxLength={"29"}
                            value={uuid}
                            onChange={uuidOnchange}
                        />
                    </div>
                    {!success && (
                        <div className="countCreate__submit--error">
                            {errorText}
                        </div>
                    )}
                    <div className="countCreate__submit">
                        <input
                            type={"submit"}
                            value={"Add new count"}
                            disabled={!success}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <button value={"cancel"} onClick={cancelBtn}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CountCreation;
