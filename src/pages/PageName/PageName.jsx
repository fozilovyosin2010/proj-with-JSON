import React from "react";

import { useLocation, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Skeleton2 from "../../Component/Skeleton";
import Pagination from "../../Component/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../reducer/pageF";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enables dark mode
  },
});

let keyFinder = [{ page: "posts", obj: ["val"] }];

const PageName = () => {
  let params = useParams();

  const [val, setVal] = useState(10);

  let pageNum = useSelector((e) => e.pageNum.val);
  let disputch = useDispatch();

  let location = useLocation();

  ///

  let [pageData, setPageData] = useState([]);
  let [loader, setLoader] = useState(false);
  let [loadTime, setLoadTime] = useState(false);

  let [dataL, setDataL] = useState(0);

  let getPage = async (pages, num) => {
    if (!loadTime) {
      setLoadTime(true);
      setLoader(true);
    }
    try {
      let { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/${pages}`
      );
      setPageData(data.slice(pageNum * val - val, pageNum * val));
      setDataL(data.length);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getPage(params.page, val);
  }, [val, pageNum]);

  useEffect(() => {
    disputch(change(1));
    setVal(10);
    getPage(params.page, val);
    setLoadTime(false);
  }, [location]);

  /////

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <div className="section m-[0_auto] p-[10px_30px]">
      <div>
        <ThemeProvider theme={darkTheme}>
          <Box
            sx={{ maxWidth: "100%" }}
            className="flex justify-between items-center"
          >
            <TextField
              fullWidth
              label="query"
              style={{ border: "#fff" }}
              id="fullWidth"
              size="small"
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Items</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={val}
                label="items"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ThemeProvider>
      </div>

      <div className="mt-[10px]">
        <div className="sec1">
          {loader ? null : (
            <div className="flex flex-col gap-2">
              {pageData.map((e) => {
                if (params.page == "posts" || params.page == "albums") {
                  return (
                    <div
                      key={e.id}
                      className="underline text-[17px] hover:text-[#4192df]"
                    >
                      {e.title}
                    </div>
                  );
                }
                if (params.page == "comments") {
                  return (
                    <div
                      key={e.id}
                      className="flex flex-col duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454]  rounded-md font-[400] border p-3 text-[16px]"
                    >
                      <div>{e.name}</div>
                      <div>{e.email}</div>
                    </div>
                  );
                }
              })}
            </div>
          )}

          {loader || pageData == [] ? (
            <>
              <Skeleton2 type={"h3"} />
              <Skeleton2 type={"h3"} />
              <Skeleton2 type={"h3"} />
              <Skeleton2 type={"h3"} />
              <Skeleton2 type={"h3"} />
              <Skeleton2 type={"h3"} width={true} center={true} />
            </>
          ) : null}
        </div>
        {loader ? null : (
          <div className="mt-[20px] flex justify-center">
            <Pagination length={Math.ceil(dataL / val)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageName;
