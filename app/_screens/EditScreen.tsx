import { Props } from "next/script";
import React, { Dispatch, SetStateAction } from "react";

export interface EditScreenProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  image: string;
}

function EditScreen({ setIsEditing, image }: EditScreenProps) {
  const reset = () => {
    setIsEditing(false);
  };
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
      <a
        href="/"
        className="absolute z-[60] top-4 left-4 m-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => reset()}
      >
        X
      </a>
      {image && (
        <img className="h-4/6 m-4" src={`data:image/png;base64,${image}`} />
      )}
      <button className="bg-blue-500 text-white font-medium rounded-md py-2 hover:bg-blue-700 w-full max-w-lg mb-28 sm:mb-0">
        {"Your Submit Button"}
      </button>
    </div>
  );
}

export default EditScreen;
