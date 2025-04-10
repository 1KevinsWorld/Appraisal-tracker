import React from "react";
import { ClipLoader } from "react-spinners";


const ButtonLoader = () => {
  return (
    <>
      <ClipLoader color="#ffffff" loading size={30} speedMultiplier={1} />
    </>
  );
};

export default ButtonLoader;
