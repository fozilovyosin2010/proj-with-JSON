import React from "react";

import { Link, useLocation, useParams } from "react-router-dom";

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
import { setLink } from "../../reducer/backL";

const PageName = () => {
  let params = useParams();

  const [val, setVal] = useState(10);
  const [checkVal, setCheckVal] = useState("All");

  let pageNum = useSelector((e) => e.pageNum.val);
  let dispatch = useDispatch();

  let location = useLocation();

  let pages = ["/posts", "/albums", "/comments", "/photos", "/todos", "/users"];
  let [not4Mod, setNot4Mod] = useState(false);

  useEffect(() => {
    if (!pages.includes(location.pathname)) {
      setLoader(false);
      console.log(false);
    }
  }, [location]);

  ///

  let [pageData, setPageData] = useState([]);
  let [searchiData, setSearchiData] = useState([]);

  let [loader, setLoader] = useState(false);

  let [dataLnum, setDataLnum] = useState(0);

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
      dispatch(change(1));
    } catch (error) {
      console.error(error);
      if (error.message == "Network Error") {
        setLoader(true);
      } else if (error.message == "Request failed with status code 404") {
        setNot4Mod(true);
        setLoader(false);
      } else {
        setLoader(false);
        setNot4Mod(false);
      }
    }
  };

  useEffect(() => {
    getPage(params.page);
  }, []);

  useEffect(() => {
    dispatch(change(1));
    setVal(10);
    getPage(params.page);
  }, [location]);

  /////

  const handleChangeVal = (event) => {
    setVal(event.target.value);
  };

  const handleChangeCheckVal = (event) => {
    let str = event.target.value;
    setCheckVal(str);

    if (str == "All") {
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
          if (e.completed == checkVal) {
            return (
              e.title.toLowerCase().includes(str.toLowerCase().trim()) &&
              e.completed == checkVal
            );
          } else if (checkVal == "All") {
            return e.title.toLowerCase().includes(str.toLowerCase().trim());
          }
        }
      });

      dispatch(change(1));

      setDataLnum(arr.length);
      setPageData(arr);
      if (arr.length == 0) {
        setLoader(true);
      } else {
        setLoader(false);
      }
    }
  }

  useEffect(() => {
    if (pageNum * val > dataLnum) {
      dispatch(change(Math.ceil(dataLnum / val)));
    }
  }, [pageNum, val]);

  return (
    <div className="section m-[0_auto] p-[10px_30px] max-sm:px-2">
      <ThemeProvider theme={darkTheme}>
        {not4Mod ? null : (
          <Box sx={{ maxWidth: "100%" }}>
            <div className="flex gap-1  justify-between items-center">
              <TextField
                onChange={(e) => inpChange(e.target.value)}
                fullWidth
                label="query"
                id="fullWidth"
                size="small"
              />
              <div className="flex justify-center">
                {params.page !== "users" ? (
                  <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
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
                  <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Complete
                    </InputLabel>
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
              </div>
            </div>
          </Box>
        )}
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
                        <Link
                          to={`/${params.page}/${e.id}`}
                          onClick={() => dispatch(setLink(`/${params.page}`))}
                          key={e.id}
                          className="underline text-[17px] hover:text-[#4192df]"
                        >
                          {e.title}
                        </Link>
                      );
                    })
                : params.page == "comments"
                ? pageData
                    .slice(pageNum * val - val, pageNum * val)
                    .map((e) => {
                      return (
                        <Link
                          to={`/${params.page}/${e.id}`}
                          onClick={() => dispatch(setLink(`/${params.page}`))}
                          key={e.id}
                          className="flex flex-col duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454]  rounded-md font-[400] border p-3 text-[16px]"
                        >
                          <div>{e.name}</div>
                          <div>{e.email}</div>
                        </Link>
                      );
                    })
                : params.page == "photos" || params.page == "users"
                ? pageData
                    .slice(pageNum * val - val, pageNum * val)
                    .map((e) => {
                      return (
                        <Link
                          to={`/${params.page}/${e.id}`}
                          onClick={() => dispatch(setLink(`/${params.page}`))}
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
                        </Link>
                      );
                    })
                : params.page == "todos"
                ? pageData
                    .slice(pageNum * val - val, pageNum * val)
                    .map((e) => {
                      return (
                        <Link
                          to={`/${params.page}/${e.id}`}
                          onClick={() => dispatch(setLink(`/${params.page}`))}
                          key={e.id}
                          className="py-2 flex gap-3  hover:text-[#4192df]"
                        >
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
                        </Link>
                      );
                    })
                : null}
            </div>
          )}

          {loader ? (
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

        {not4Mod ? (
          <div className="  section max-w-full border-[2px] ">
            <div className="flex justify-center flex-col  p-[50px] items-center">
              <div className="font-black text-[28px] max-w-[400px] text-center">
                404 Not Found!
              </div>
              <div className="font-medium text-center">
                You've followed to an incorrect link!
              </div>
            </div>
          </div>
        ) : null}
        {loader ? null : (
          <div className="mt-[20px] flex justify-center max-w-full">
            {not4Mod ? null : <Pagination length={Math.ceil(dataLnum / val)} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageName;
