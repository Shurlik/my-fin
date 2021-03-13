import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {saveCounts} from "../../store/Counts/actions"
import "./index.scss"

const CountCreation = () => {
    const dispatch = useDispatch();
    const counts = useSelector(state => state.countsData.counts)

    const [uuid, setUuid] = useState("UA");
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(true);
    const reg = /^[A-Za-z]{2}[0-9]{27}$/

    const uuidOnchange = (e) => {
        setUuid(e.target.value)
        if (reg.test(e.target.value)) {
            setSuccess(true)
        }
    }

    const nameOnchange = (e) => {
        setName(e.target.value)
    }

    const addNewCount = (name, uuid) => {
        const newCount = {
            name: name,
            uuid: uuid,
            balance: 0,
            currency: "uah"
        }
        dispatch(saveCounts([...counts, newCount]))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (reg.test(uuid)) {
            setSuccess(true);
            addNewCount(name, uuid)
            setUuid("UA");
            setName("")
        } else {
            setSuccess(false);
        }
    }

    return (
        <div className={"countCreate"}>
            <form onSubmit={handleSubmit}>
                <div className={"countCreate__input"}>Count name (max: 10):</div>
                <div className="countCreate__input--name">
                    <input type="text" maxLength={"10"} value={name} onChange={nameOnchange} required/>
                </div>
                <div className={"countCreate__input"}>Count UUID (max: 29):</div>
                <div className="countCreate__input--uuid">
                    <input type="text" maxLength={"29"} value={uuid} onChange={uuidOnchange}/>
                </div>
                {!success &&
                <div className="countCreate__submit--error">Please, check UUID, it should be 2 letters and 27
                    digits.</div>}
                <div className="countCreate__submit">
                    <input type={"submit"} value={"Add new count"} disabled={!success}/>
                </div>
            </form>
        </div>
    );
};

export default CountCreation;
