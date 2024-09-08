import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function AddTransactionForm({ isOpenModal, toggleModal, refetchTransaction }) {
  if (!isOpenModal) return null;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [wallet, setWallet] = useState("");
  const [category, setCategory] = useState("");
  const [flowType, setFlowType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { postData } = usePostData();

  const { data: dataWallets, loading: loadingDataWallets } = useGetData(
    `${import.meta.env.VITE_API_URL}/wallets`
  );
  const { data: dataCategories, loading: loadingDataCategories } = useGetData(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !amount || !wallet || !category || !flowType) {
      alert("Please fill in all fields");
      return;
    }

    const requestData = {
      title: title,
      amount: amount,
      wallet: wallet,
      category: category,
      flowType: flowType,
    };

    setIsLoading(true);

    postData(`${import.meta.env.VITE_API_URL}/expense-items`, requestData)
      .then(() => {
        refetchTransaction();
        toggleModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (loadingDataWallets || loadingDataCategories) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl mx-4">
          <ArrowPathIcon className="w-10 h-10 animate-spin text-gray-500 mx-auto" />
          <p className="text-center mt-4">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center text-left">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl mx-4">
        <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-400 pb-2">Add Transaction</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="transaction-name"
            >
              Transaction Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="transaction-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="amount-name"
            >
              Amount
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              id="amount-name"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="wallet-name"
            >
              Wallet Name
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {dataWallets?.map((wallet) => (
                <option key={wallet._id} value={wallet._id}>
                  {wallet.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="category-name"
            >
              Category Name
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {dataCategories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="flowType-name"
            >
              Flow Type Name
            </label>
            <select
              className="block w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={flowType}
              onChange={(e) => setFlowType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="income">
                Income
              </option>
              <option value="outcome">
                Outcome
              </option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleModal}
              className={`bg-red-500 text-white font-bold py-2 px-4 rounded mr-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className={`bg-green-500 text-white font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin text-white inline-block" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionForm;
