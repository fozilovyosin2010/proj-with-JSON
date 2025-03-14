import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const useDarkSide = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const color = theme == "dark" ? "light" : "dark";

  useEffect(() => {
    let root = window.document.documentElement;
    root.classList.add(theme);
    root.classList.remove(color);

    localStorage.setItem("theme", theme);
  }, [theme, color]);

  return [color, setTheme];
};

export default useDarkSide;
