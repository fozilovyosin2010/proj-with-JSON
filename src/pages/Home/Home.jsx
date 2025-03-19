import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loader from "../../Component/Skeleton";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";
const Home = () => {
  let [postData, setPostData] = useState([]);
  let [loader, setLoader] = useState(false);

  let [comsData, setComsData] = useState([]);

  let [AlbData, setAlbData] = useState([]);

  let [photosData, setPhotosData] = useState([]);
  let [todosData, setTodosData] = useState([]);

  let getPosts = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPostData(data.slice(0, 5));
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  let getComments = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setComsData(data.slice(0, 5));
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  let getAlbums = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setAlbData(data.slice(0, 5));
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  let getPhotos = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setPhotosData(data.slice(0, 5));
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  let getTodos = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodosData(data.slice(0, 5));
      setLoader(false);
      console.log(data);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getPosts();
    getComments();
    getAlbums();
    getPhotos();
    getTodos();
  }, []);

  // let itemsData = [
  //   { name: "Posts", obj: comsData, val: ["title"] },
  //   { name: "Comments", obj: comsData, val: ["name", "email"] },
  //   { name: "Albums", obj: comsData, val: ["title"] },
  // ];

  return (
    <div className="px-[20px] section">
      <div className="sec1">
        <div className="text-[20px] font-bold text-center py-2">Posts</div>
        <div className="flex flex-col">
          {postData.map((e) => {
            return (
              <Link to={`/posts/${e.id}`} key={e.id} className="underline">
                {e.title}
              </Link>
            );
          })}
        </div>

        {loader || postData == [] ? (
          <>
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
          </>
        ) : null}

        <div className="flex justify-center py-2">
          <Button variant="outlined">See more posts</Button>
        </div>
      </div>
      <div className="sec2">
        <div className="text-[20px] font-bold text-center py-2">Albums</div>
        {AlbData.map((e) => {
          return (
            <div key={e.id} className="underline">
              {e.title}
            </div>
          );
        })}

        {loader || AlbData == [] ? (
          <>
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
          </>
        ) : null}

        <div className="flex justify-center py-2">
          <Button variant="outlined">See more posts</Button>
        </div>
      </div>
      <div className="sec3">
        <div className="text-[20px] font-bold text-center py-2">Coments</div>
        <div className="flex flex-col gap-2">
          {comsData.map((e) => {
            return (
              <div
                key={e.id}
                className="flex duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454] flex-col rounded-md font-[400] border p-3 text-[16px]"
              >
                <div>{e.name}</div>
                <div>{e.email}</div>
              </div>
            );
          })}
          {loader || comsData == [] ? (
            <>
              <Loader type={"h3"} />
              <Loader type={"h3"} />
              <Loader type={"h3"} />
              <Loader type={"h3"} />
              <Loader type={"h3"} />
            </>
          ) : null}
        </div>

        <div className="flex justify-center py-2">
          <Button variant="outlined">See more comments</Button>
        </div>
      </div>
      <div className="sec4">
        <div className="text-[20px] font-bold text-center py-2">Photos</div>
        <div className="flex flex-col gap-2">
          {photosData.map((e) => {
            return (
              <div
                key={e.id}
                className="flex gap-[20px] max-w-full items-center duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454] rounded-md font-[400] border p-3 text-[16px]"
              >
                <div className="w-[40px] h-[40px] rounded-[100px] dark:text-black text-[#fff] bg-[#ccc] flex items-center justify-center font-medium">
                  R
                </div>

                <div className="flex flex-col">
                  <div>Item {e.id}</div>
                  <div className="max-w-[250px] dark:text-[#ccc]">
                    {e.title}
                  </div>
                </div>
              </div>
            );
          })}
          {loader || comsData == [] ? (
            <>
              <Loader type={"h3"} />
              <Loader type={"h3"} />
              <Loader type={"h3"} />
              <Loader type={"h3"} />
              <Loader type={"h3"} />
            </>
          ) : null}
        </div>

        <div className="flex justify-center py-2">
          <Button variant="outlined">See more photos</Button>
        </div>
      </div>
      <div className="sec5">
        {todosData.map((e) => {
          return (
            <div key={e.id} className="py-2 flex gap-3">
              <input type="checkbox" checked={e.completed} />
              <div
                style={
                  e.completed
                    ? { textDecoration: "line-through", color: "#2c2ce3" }
                    : { textDecoration: "none" }
                }
              >
                {e.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
