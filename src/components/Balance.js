import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";
export default function Balance() {
    const { transactions } = useSelector((state) => state.transactions);
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === "expense"
            ? acc - transaction.amount
            : acc + transaction.amount;
    }, 0);

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>
                {numberWithCommas(balance)}
            </h3>
        </div>
    );
}
