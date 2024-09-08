import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import formattedDate from "../../utils/formattedDate";
import useDeleteData from "../../hooks/useDeleteData";
import EditTransactionForm from "./EditTransactionForm";

function TransactionItem({ transaction, refetchTransaction }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const { deleteData } = useDeleteData(
    `${import.meta.env.VITE_API_URL}/expense-items`
  );

  const FlowType = () => {
    if (transaction.flowType === "income") {
      return (
        <span className="text-green-500 font-semibold">
          ${transaction.amount}
        </span>
      );
    } else {
      return (
        <span className="text-red-500 font-semibold">
          -${transaction.amount}
        </span>
      );
    }
  };

  const handleDeleteTransaction = async (id) => {
    await deleteData(id, refetchTransaction);
  };

  return (
    <>
      <li
        onClick={toggleModal}
        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-300 hover:cursor-pointer"
      >
        <div>
          <h3 className="text-blue-600">{transaction.title}</h3>
          <p className="text-sm text-gray-500">
            {formattedDate(transaction.createdAt)}
          </p>
        </div>
        <div className="flex">
          <FlowType />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTransaction(transaction._id);
            }}
            className="text-red-500 hover:text-red-700 ms-4"
            aria-label="Delete transaction"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      </li>
      <EditTransactionForm
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        refetchTransaction={refetchTransaction}
        idTransaction={transaction._id}
      />
    </>
  );
}

export default TransactionItem;
