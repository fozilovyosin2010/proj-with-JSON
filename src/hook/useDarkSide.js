import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../reducer/darkF";

const useDarkSide = () => {
  let disputch = useDispatch();
  const [theme, setTheme] = useState(localStorage.theme);
  const color = theme == "dark" ? "light" : "dark";

  useEffect(() => {
    let root = window.document.documentElement;
    root.classList.add(theme);
    root.classList.remove(color);
    localStorage.setItem("theme", theme);

    disputch(toggle(theme == "dark"));
  }, [theme, color]);

  return [color, setTheme];
};

export default useDarkSide;
