// Component show single Count info with transactions
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Transactions from "../Transactions";
import "./index.scss";

const CountDetailed = ({ match }) => {
    const count = useSelector((state) => state.countsData.counts).find(
        (count) => count.name === match.params.name
    );
    const transactions = useSelector((state) => state.countsData.transactions);
    const transactionsLoaded = useSelector(
        (state) => state.countsData.transactionsLoaded
    );

    const currentTransactions =
        transactionsLoaded && transactions[count.uuid] !== undefined
            ? transactions[count.uuid].map((transaction) => (
                  <Transactions
                      transaction={transaction}
                      key={transaction.id}
                  />
              ))
            : "";

    return (
        <div className={"countDetailed"}>
            <Link className="countDetailed--return" to={`/`}>
                <div>
                    <span className={"countDetailed__link"}>
                        -- Return to Main page --
                    </span>
                </div>
            </Link>

            <div className="countDetailed__title">
                Count name:&nbsp;
                <span className="countDetailed__title--content">
                    {count.name}
                </span>
            </div>
            <div className={"countDetailed__body"}>
                <div className="countDetailed__number">
                    UUID:&nbsp;
                    <span className="countDetailed__number--content">
                        {count.uuid}
                    </span>
                </div>

                <div className="countDetailed__balance">
                    <div className="countDetailed__balance--text">
                        Current balance:&nbsp;
                    </div>
                    <div>
                        <span className={"countDetailed__balance--total"}>
                            {count.balance}
                        </span>
                        <span className={"countDetailed__balance--currency"}>
                            &nbsp;{count.currency}
                        </span>
                    </div>
                </div>
            </div>
            <div className="countDetailed__transactions">
                <div className="countDetailed__transactions--title">
                    {" "}
                    Transactions:
                </div>
                <div className="countDetailed__transactions--body">
                    {currentTransactions}
                </div>
            </div>
        </div>
    );
};

export default CountDetailed;
