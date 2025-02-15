import Transaction from "./Transaction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Transactions() {
    const { loading, error, transactions } = useSelector((state) => state.transactions);



console.log(transactions);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {
                        !loading && !error && transactions.map((transaction) => (
                            <Transaction key={transaction.id} transaction={transaction} />
                        ))}

                        {
                            !loading && !error && transactions.length === 0 && (
                                <p>No transactions found</p>
                            )}
                </ul>
            </div>
        </>
    );
}
