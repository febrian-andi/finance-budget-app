import { useState } from "react";
import usePostData from "../../hooks/usePostData";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function AddWalletForm({ isOpenModal, toggleModal, refetchWallets }) {
  if (!isOpenModal) return null;

  const [wallet, setWallet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { postData } = usePostData();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!wallet) {
      alert("Please fill in all fields.");
      return;
    }

    const requestData = {
      name: wallet,
    };

    setIsLoading(true);

    postData(`${import.meta.env.VITE_API_URL}/wallets`, requestData)
      .then(() => {
        refetchWallets();
        toggleModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl mx-4">
        <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-400 pb-2">Add Wallet</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="wallet-name"
            >
              Wallet Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="wallet-name"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              required
            />
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

export default AddWalletForm;
