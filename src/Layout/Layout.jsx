import React, { useEffect, useRef, useState } from "react";
import { Link, Links, Outlet, useParams } from "react-router-dom";
import Switcher from "../Component/Switcher";
import Loader from "../Component/Skeleton";

const Layout = () => {
  let links = ["Posts", "Albums", "Coments", "Photos", "Todos", "Users"];

  let [toggle, setToggle] = useState(false);
  let toggleTag = useRef();
  let [toggleMod, setToggleMod] = useState(false);
  let toggleModCheck = useRef();
  let toggleFlow = useRef();

  function toggleMenu() {
    // console.log(toggle);
    if (toggle == false) {
      toggleTag.current.classList.add("change");
      setToggleMod(true);
    } else {
      toggleTag.current.classList.remove("change");
      setTimeout(() => {
        setToggleMod(false);
      }, 300);
    }

    setToggle(!toggle);
  }

  useEffect(() => {
    if (toggle) {
      setTimeout(() => {
        toggleFlow.current.classList.add("flow-down");
        toggleFlow.current.classList.remove("flow-up");
      }, 100);
    } else if (toggleFlow.current !== undefined) {
      setTimeout(() => {
        toggleFlow.current.classList.remove("flow-down");
        toggleFlow.current.classList.add("flow-up");
      }, 100);
    }
  }, [toggle]);
  return (
    <div className="dark:bg-[#1c1c1c] dark:text-[#fff]">
      <div className="header sticky top-0 duration-300 backdrop-blur-[50px]  z-20  text-[16px] font-medium border-b dark:bg-[#00000063] p-2 dark:text-[#fff]">
        <div className="section items-center flex justify-between">
          <Link
            onClick={() => {
              if (toggle) {
                toggleMenu();
                setTimeout(() => {
                  setToggleMod(false);
                }, 300);
              }
            }}
            to={"/"}
          >
            Home
          </Link>
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
            className="menuBar hidden max-md:flex  gap-1 flex-col"
          >
            <div className="bar1 w-[20px] duration-[0.3s] h-[2px] dark:bg-[#fff] bg-black"></div>
            <div className="bar2 w-[20px] duration-[0.3s] h-[2px] dark:bg-[#fff] bg-black"></div>
            <div className="bar3 w-[20px] duration-[0.3s] h-[2px] dark:bg-[#fff] bg-black"></div>
          </button>

          <Switcher />
        </div>
      </div>

      {toggleMod ? (
        <div
          ref={toggleModCheck}
          onClick={(e) => {
            if (e.target == toggleModCheck.current) {
              toggleMenu();
              setTimeout(() => {
                setToggleMod(false);
              }, 300);
            }
          }}
          className="w-full  z-10 min-h-[100vh] overflow-hidden fixed left-0   "
        >
          <div ref={toggleFlow} className=" section  flow-up duration-300">
            <div className="absolute border-b-[2px] backdrop-blur-[10px]  dark:bg-[#00000063] top-0 left-0 w-full section px-2 flex flex-col bg-[#ffffff5b] font-medium">
              {links.map((e, i) => {
                return (
                  <Link
                    onClick={() => {
                      toggleMenu();
                      setTimeout(() => {
                        setToggleMod(false);
                      }, 300);
                    }}
                    className="py-2 text-center"
                    to={e}
                    key={i}
                  >
                    {e}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      <Outlet />
      <div className="footer">footer</div>
    </div>
  );
};

export default Layout;
