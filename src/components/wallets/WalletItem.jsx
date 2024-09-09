import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import EditWalletForm from "./EditWalletForm";

function WalletItem({ wallet, refetchWallets }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const { deleteData } = useDeleteData(
    `${import.meta.env.VITE_API_URL}/wallets`
  );

  const handleDeleteWallet = async (id) => {
    await deleteData(id, refetchWallets);
  };

  return (
    <>
      <li
        onClick={toggleModal}
        className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:bg-gray-300 hover:cursor-pointer"
      >
        <div className="flex items-center">
          <img src={`https://ui-avatars.com/api/?name=${wallet.name}&background=random`} alt="icon" className="me-2 w-9 rounded-xl drop-shadow-lg border-2 border-gray-300"/>
          <p>{wallet.name}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteWallet(wallet._id);
          }}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete category"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </li>
      <EditWalletForm
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        refetchWallets={refetchWallets}
        idWallet={wallet._id}
      />
    </>
  );
}

export default WalletItem;
