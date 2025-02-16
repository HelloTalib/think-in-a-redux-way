import { useSelector } from "react-redux";
import Transaction from "./Transaction";
import { fetchTransactions } from "../../features/transactions/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export default function Transactions() {
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector(
        (state) => state.transactions
    );

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch, fetchTransactions]);

    // render the transactions


    // decide what to render
    let content = null;
    if (loading) content = <p>Loading...</p>;

    if (!loading && error)
        content = <p className="error">There was an error occured</p>;

    if (!loading && !error && transactions?.length > 0) {
        content = transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    if (!loading && !error && transactions?.length === 0) {
        content = <p>No transactions found!</p>;
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>
            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>
        </>
    );
}