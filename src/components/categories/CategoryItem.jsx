import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import formattedDate from "../../utils/formattedDate";
import useDeleteData from "../../hooks/useDeleteData";
import EditCategoryForm from "./EditCategoryForm";

function CategoryItem({ category, refetchCategories }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const { deleteData } = useDeleteData(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  const handleDeleteCategory = async (id) => {
    await deleteData(id, refetchCategories);
  };

  return (
    <>
      <li
        onClick={toggleModal}
        className="bg-white p-4 rounded-lg shadow flex items-center justify-between hover:bg-gray-300 hover:cursor-pointer"
      >
        <div>
          <p className="font-semibold">{category.name}</p>
          <p className="text-gray-400">{formattedDate(category.createdAt)}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteCategory(category._id);
          }}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete category"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </li>
      <EditCategoryForm
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        refetchCategories={refetchCategories}
        idCategory={category._id}
      />
    </>
  );
}

export default CategoryItem;
