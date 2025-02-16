import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../features/transactions/slice";
import { useEffect } from "react";
import numberWithCommas from "../../utils/numberWithCommas";
import { activeEditing } from "../../features/transactions/slice";
export default function Transaction(props) {
    const { transaction } = props;
    const dispatch = useDispatch();


    const handleUpdateTransaction = () => {
        dispatch( activeEditing(transaction) );
    };

    useEffect(() => {
        console.log("Transaction rendered");
    }, []);

    return (
        <li className={`transaction ${transaction.type}`}>
            <p>{transaction.name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(transaction.amount)}</p>
                <button className="link" onClick={handleUpdateTransaction}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={() => dispatch(deleteTransaction(transaction.id))}>
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
