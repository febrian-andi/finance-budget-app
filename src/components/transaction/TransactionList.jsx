import useGetData from "../../hooks/useGetData";
import TransactionHeader from "./TransactionHeader";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  const { data, loading, error, refetch } = useGetData(
    `${import.meta.env.VITE_API_URL}/expense-items`
  );

  return (
    <>
      <TransactionHeader transaction={data} refetchTransaction={refetch}/>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-200 text-gray-700 rounded-md">
          Dates
        </button>
        <button className="px-4 py-2 bg-blue-200 text-gray-700 rounded-md">
          Types
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
        {data?.map((transaction) => (
          <TransactionItem key={transaction._id} transaction={transaction} refetchTransaction={refetch}/>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
