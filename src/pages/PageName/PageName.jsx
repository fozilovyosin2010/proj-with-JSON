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
import { add, change } from "../../reducer/pageF";
import { FormLabel, Input } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enables dark mode
  },
});

let keyFinder = [{ page: "posts", obj: ["val"] }];

const PageName = () => {
  let params = useParams();

  const [val, setVal] = useState(10);
  const [checkVal, setCheckVal] = useState("All");

  let pageNum = useSelector((e) => e.pageNum.val);
  let dispatch = useDispatch();

  let location = useLocation();

  let isDarkMode = useSelector((e) => e.isDarkMode.val);

  ///

  let [pageData, setPageData] = useState([]);
  let [searchiData, setSearchiData] = useState([]);

  let [loader, setLoader] = useState(false);
  let [loadTime, setLoadTime] = useState(false);

  let [dataLnum, setDataLnum] = useState(0);

  let [inpSearch, setInpSearch] = useState("");

  let getPage = async (pages) => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/${pages}`
      );

      setPageData(data);
      setSearchiData(data);
      setLoader(false);
      setDataLnum(data.length);
    } catch (error) {
      console.error(error);
      if (error.message == "Network Error") {
        setLoader(true);
      } else {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    getPage(params.page);
  }, []);

  useEffect(() => {
    dispatch(change(1));
    setVal(10);
    setLoadTime(false);
    getPage(params.page);
  }, [location]);

  /////

  const handleChangeVal = (event) => {
    setVal(event.target.value);
  };

  const handleChangeCheckVal = (event) => {
    let str = event.target.value;
    setCheckVal(str);
    if (str == "") {
      getPage(params.page);
    } else {
      let arr;
      arr = searchiData.filter((e) => {
        if (str == true) {
          return e.completed;
        } else if (str == false) {
          return !e.completed;
        } else {
          return e;
        }
      });
      setPageData(arr);
      setDataLnum(arr.length);
      dispatch(change(1));
    }
  };

  let DarkMode = useSelector((e) => e.isDarkMode.val);

  const darkTheme = createTheme({
    palette: {
      mode: DarkMode ? "dark" : "light",
    },
  });

  function inpChange(str) {
    if (str.trim() == "") {
      getPage(params.page);
    } else {
      let arr;

      arr = searchiData.filter((e) => {
        if (
          params.page == "posts" ||
          params.page == "albums" ||
          params.page == "photos"
        ) {
          return e.title.toLowerCase().includes(str.toLowerCase().trim());
        } else if (params.page == "comments" || params.page == "users") {
          return (
            e.name.toLowerCase().includes(str.toLowerCase().trim()) ||
            e.email.toLowerCase().includes(str.toLowerCase().trim())
          );
        } else if (params.page == "todos") {
          return (
            e.title.toLowerCase().includes(str.toLowerCase().trim()) &&
            e.completed == checkVal
          );
        }
      });

      console.log(searchiData);

      dispatch(change(1));

      setDataLnum(arr.length);
      setPageData(arr);
    }
  }

  return (
    <div className="section m-[0_auto] p-[10px_30px]">
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{ maxWidth: "100%" }}
          className="flex justify-between items-center"
        >
          <TextField
            onChange={(e) => inpChange(e.target.value)}
            fullWidth
            label="query"
            id="fullWidth"
            size="small"
          />
          {params.page !== "users" ? (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Items</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={val}
                label="items"
                onChange={handleChangeVal}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          ) : null}
          {params.page == "todos" ? (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Completed</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={checkVal}
                label="items"
                onChange={handleChangeCheckVal}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </Box>
      </ThemeProvider>
      <div className="mt-[10px]">
        <div className="sec1">
          {loader ? null : (
            <div className="flex flex-col gap-2">
              {params.page == "posts" || params.page == "albums"
                ? pageData
                    .slice(pageNum * val - val, pageNum * val)
                    .map((e) => {
                      return (
                        <div
                          key={e.id}
                          className="underline text-[17px] hover:text-[#4192df]"
                        >
                          {e.title}
                        </div>
                      );
                    })
                : params.page == "comments"
                ? pageData
                    .slice(pageNum * val - val, pageNum * val)
                    .map((e) => {
                      return (
                        <div
                          key={e.id}
                          className="flex flex-col duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454]  rounded-md font-[400] border p-3 text-[16px]"
                        >
                          <div>{e.name}</div>
                          <div>{e.email}</div>
                        </div>
                      );
                    })
                : params.page == "photos" || params.page == "users"
                ? pageData
                    .slice(pageNum * val - val, pageNum * val)
                    .map((e) => {
                      return (
                        <div
                          key={e.id}
                          className="flex gap-[20px] max-w-full items-center duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454] rounded-md font-[400] border p-3 text-[16px]"
                        >
                          <div className="w-[40px] h-[40px] rounded-[100px]  dark:text-black text-[#fff] bg-[#ccc] flex items-center text-[20px] justify-center ">
                            {params.page == "photos"
                              ? "R"
                              : e.name
                              ? e.name.at()
                              : null}
                          </div>

                          <div className="flex flex-col">
                            {params.page == "photos" ? (
                              <div>Item {e.id}</div>
                            ) : (
                              <div className="font-medium">{e.name}</div>
                            )}
                            {params.page == "photos" ? (
                              <div className="max-w-[250px] dark:text-[#ccc]">
                                {e.title}
                              </div>
                            ) : (
                              <div className="text-[#3f3939] dark:text-[#ccc]">
                                {e.email}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                : params.page == "todos"
                ? pageData
                    .slice(pageNum * val - val, pageNum * val)
                    .map((e) => {
                      return (
                        <div key={e.id} className="py-2 flex gap-3">
                          <input
                            readOnly
                            type="checkbox"
                            checked={e.completed}
                          />
                          <div
                            style={
                              e.completed
                                ? {
                                    textDecoration: "line-through",
                                    color: "rgb(39,138,255)",
                                  }
                                : { textDecoration: "none" }
                            }
                          >
                            {e.title}
                          </div>
                        </div>
                      );
                    })
                : null}
            </div>
          )}

          {loader ||
          pageData == [] ||
          pageData.slice(pageNum * val - val, pageNum * val).length == 0 ? (
            <div className="flex flex-col gap-2">
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2
                type={
                  params.page == "posts" || params.page == "albums"
                    ? "body1"
                    : params.page == "comments"
                    ? "h3"
                    : params.page == "photos" || params.page == "users"
                    ? "h1"
                    : "caption"
                }
              />
              <Skeleton2 type={"h3"} width={true} center={true} />
            </div>
          ) : null}
        </div>
        {/* Math.ceil(dataLnum / val) */}
        {loader ? null : (
          <div className="mt-[20px] flex justify-center">
            <Pagination length={Math.ceil(dataLnum / val)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageName;
