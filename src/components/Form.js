import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, updateTransaction } from "../features/transactions/slice";
import { useSelector } from "react-redux";
export default function Form() {
    const [name, setName] = useState("");
    const [type, setType] = useState("income");
    const [amount, setAmount] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.transactions);
    const {activeEditing} = useSelector((state) => state.transactions);

const reset = () => {
    setName("");
    setType("");
    setAmount("");
}
    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = {
            name,
            type,
            amount: Number(amount),
        };
        dispatch(addTransaction(transaction));
        reset();
    }

    const handleCancelEdit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        reset();
    }

    const handleUpdateTransaction = (e) => {
        e.preventDefault();
        const transaction = {
            id: activeEditing.id,
            name,
            type,
            amount: Number(amount),
        };
        dispatch(updateTransaction(transaction));
        reset();
    }

    useEffect(() => {
        const {id, name, type, amount} = activeEditing || {};
        if (id) {
            setIsEditing(true);
            setName(name);
            setType(type);
            setAmount(amount);
        }else{
            setIsEditing(false);
            reset();

        }

    }, [activeEditing]);

    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={isEditing ? handleUpdateTransaction: handleSubmit}>
            <div className="form-group">
                <label htmlFor="transaction_name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Salary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group radio">
                <label htmlFor="transaction_type">Type</label>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="income"
                        name="transaction_type"
                        checked = {type === "income"}
                        onChange={(e) => setType(e.target.value)}

                    />
                    <label htmlFor="transaction_type">Income</label>
                </div>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="expense"
                        name="transaction_type"
                        placeholder="Expense"
                        checked = {type === "expense"}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="transaction_type">Expense</label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="transaction_amount">Amount</label>
                <input
                    type="number"
                    placeholder="300"
                    name="transaction_amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}

                />
            </div>
            <button disabled={loading} className="btn">{isEditing? `UPdate`: `Add`} Transaction</button>
</form>
        {!loading && error && <p className="error">{error}</p>}
            {isEditing && <button className="btn cancel_edit" onClick={handleCancelEdit}>Cancel Edit</button>}

        </div>
    );
}
