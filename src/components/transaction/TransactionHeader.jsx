import { useState } from "react";
import AddTransactionForm from './AddTransactionForm';

function TransactionHeader({ transaction, refetchTransaction }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const totalIncome = () => {
    let total = 0;
    transaction.forEach((item) => {
      if (item.flowType === "income") {
        total += item.amount;
      }
    });
    return total;
  };

  const totalOutcome = () => {
    let total = 0;
    transaction.forEach((item) => {
      if (item.flowType === "outcome") {
        total += item.amount;
      }
    });
    return total;
  };

  return (
    <div>
      <div className="sm:flex justify-between items-center text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 md:mb-0">Home Wallet</h2>
        <button onClick={toggleModal} className="text-gray-700 bg-blue-300 px-4 py-2 rounded-lg">
          Add Transaction
        </button>
        <AddTransactionForm isOpenModal={isOpenModal} toggleModal={toggleModal} refetchTransaction={refetchTransaction}/>
      </div>
      <div className="mb-4">
        {transaction && (
          <div className="md:flex justify-between text-center">
            <p>Number of transactions: {transaction.length}</p>
            <p className="ml-4">Total Income: ${totalIncome()}</p>
            <p className="ml-4">Total Outcome: ${totalOutcome()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHeader;
