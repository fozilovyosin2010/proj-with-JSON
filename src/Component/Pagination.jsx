import React, { useEffect, useState } from "react";
import Pagination1 from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../reducer/pageF";
import useDarkSide from "../hook/useDarkSide";

const Pagination = ({ length }) => {
  let page = useSelector((e) => e.pageNum.val);
  let disputch = useDispatch();

  let DarkMode = useSelector((e) => e.isDarkMode.val);

  const darkTheme = createTheme({
    palette: {
      mode: DarkMode ? "dark" : "light",
    },
  });

  function handleChange(event, value) {
    console.log(value);

    disputch(change(value));
  }
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Stack spacing={2}>
          <Pagination1
            page={page}
            count={length}
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      </ThemeProvider>
    </div>
  );
};

export default Pagination;
