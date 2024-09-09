import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import TransactionHeader from "./TransactionHeader";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  const { data, loading, error, refetch } = useGetData(
    `${import.meta.env.VITE_API_URL}/expense-items`
  );

  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const handleSortByDate = () => {
    setIsSortedAsc(!isSortedAsc);
  };
  const sortedTransactions = (transactions) => {
    if (!transactions) return [];
    return transactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (isSortedAsc) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };

  return (
    <>
      <TransactionHeader transaction={data} refetchTransaction={refetch} />
      <div className="flex space-x-4 mb-3">
        <button
          onClick={handleSortByDate}
          className="px-4 py-2 bg-sky-300 text-gray-700 rounded-md hover:bg-sky-500"
        >
          Sort by Date {isSortedAsc ? "▲" : "▼"}
        </button>
      </div>
      <ul className="space-y-4">
        {loading && (
          <div className="flex justify-center items-center">
            <svg
              className="w-6 h-6 animate-spin text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 1 1 0 20" />
            </svg>
          </div>
        )}
        {error && <p>Error: {error.message}</p>}
        {data && data.length === 0 && <p>No transaction available.</p>}
        {sortedTransactions(data)?.map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            refetchTransaction={refetch}
          />
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
