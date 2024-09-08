import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import CategoryItem from "./CategoryItem";
import AddCategoryForm from './AddCategoryForm';

function CategoryList() {
  const { data, loading, error, refetch } = useGetData(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold my-auto">Categories</h2>
        <button onClick={toggleModal} className="btn flex justify-center items-center border border-gray-400 border-dashed rounded-lg transition-transform transform hover:scale-110 hover:shadow-lg hover:bg-gray-300 hover:border-black hover:font-bold w-8 h-8">
          <p className="text-3xl text-gray-500 hover:text-black">+</p>
        </button>
        <AddCategoryForm isOpenModal={isOpenModal} toggleModal={toggleModal} refetchCategories={refetch}/>
      </div>
      <ul className="mt-4 space-y-4">
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
        {data && data.length === 0 && <p>No category available.</p>}
        {data?.map((category) => (
          <CategoryItem key={category._id} category={category} refetchCategories={refetch}/>
        ))}
      </ul>
    </>
  );
}

export default CategoryList;
