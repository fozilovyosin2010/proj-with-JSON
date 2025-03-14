import React, { useState } from "react";
import useDarkSide from "../hook/useDarkSide";
// import d from "../hook/darkSide";
const Switcher = () => {
  let [color, setTheme] = useDarkSide();
  //   let [dark, setDark] = useState(color == "light");

  return (
    <div className="border  border-[#3e81f5] p-1 flex gap-1 items-center rounded-[50px]">
      <button
        onClick={() => setTheme("light")}
        className="bg-[#3e81f5] duration-[0.5s] dark:hover:bg-[#96d5e8ef] dark:text-[#3e81f5] dark:bg-transparent rounded-[50px] p-1"
      >
        <svg
          className="text-[#fff] "
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M256 48v48m0 320v48m147.08-355.08l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48m-320 0H48m355.08 147.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
          ></path>
          <circle
            cx="256"
            cy="256"
            r="80"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
          ></circle>
        </svg>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className="bg-transparent duration-[0.5s] dark:bg-[#3e81f5] hover:bg-[#96d5e8ef] hover:text-[#fff] dark:text-[#fff] text-[#3e81f5] rounded-[50px] p-1"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Switcher;
