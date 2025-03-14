import React, { useRef, useState } from "react";
import { Link, Links, Outlet, useParams } from "react-router-dom";
import Switcher from "../Component/Switcher";

const Layout = () => {
  let links = ["albums", "coments", "photos", "todos", "users"];

  let [toggle, setToggle] = useState(false);
  let toggleTag = useRef();

  function toggleMenu() {
    // console.log(toggle);
    if (toggle == false) {
      toggleTag.current.classList.add("change");
    } else {
      toggleTag.current.classList.remove("change");
    }

    setToggle(!toggle);

    // console.log(toggleTag.current.classList.add);
  }
  return (
    <div>
      <div className="header text-[16px] font-medium border-b dark:bg-black p-2 dark:text-[#ffffff7c]">
        <div className="max-w-[1200px] m-[0_auto] items-center  flex justify-between">
          <Link to={"/"}>Home</Link>
          <div className="nav max-md:hidden flex  justify-between gap-2">
            {links.map((e, i) => {
              return (
                <Link
                  className="relative after:content-[''] after:w-full after:h-[3px] dark:after:bg-[#fff] after:bg-black after:absolute after:left-0 after:bottom-[-5px] after:duration-[0.3s] after:scale-x-[0] hover:after:scale-x-[1]"
                  key={i}
                  to={e}
                >
                  {e}
                </Link>
              );
            })}
          </div>
          <button
            ref={toggleTag}
            onClick={toggleMenu}
            // change
            className="menuBar hidden max-md:flex gap-1 flex-col"
          >
            <div className="bar1 w-[20px] duration-[0.3s] h-[2px] bg-black"></div>
            <div className="bar2 w-[20px] duration-[0.3s] h-[2px] bg-black"></div>
            <div className="bar3 w-[20px] duration-[0.3s] h-[2px] bg-black"></div>
          </button>
          <Switcher />
        </div>
      </div>
      <Outlet />
      <div className="footer">footer</div>
    </div>
  );
};

export default Layout;
