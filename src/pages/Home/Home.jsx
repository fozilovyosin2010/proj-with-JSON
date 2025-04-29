import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loader from "../../Component/Skeleton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLink } from "../../reducer/backL";
const Home = () => {
  let dispatch = useDispatch();

  let [postData, setPostData] = useState([]);
  let [loader, setLoader] = useState(false);

  let [comsData, setComsData] = useState([]);

  let [AlbData, setAlbData] = useState([]);

  let [photosData, setPhotosData] = useState([]);

  let [todosData, setTodosData] = useState([]);

  let [usersData, setUsersData] = useState([]);

  let getPosts = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      setPostData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);

      if (error.message == "Network Error") {
        setLoader(true);
      } else {
        setLoader(false);
      }
    }
  };

  let getComments = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/comments?_limit=5"
      );
      setComsData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);

      if (error.message == "Network Error") {
        setLoader(true);
      } else {
        setLoader(false);
      }
    }
  };

  let getAlbums = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/albums?_limit=5"
      );
      setAlbData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);

      if (error.message == "Network Error") {
        setLoader(true);
      } else {
        setLoader(false);
      }
    }
  };

  let getPhotos = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos?_limit=5"
      );
      setPhotosData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);

      if (error.message == "Network Error") {
        setLoader(true);
      } else {
        setLoader(false);
      }
    }
  };

  let getTodos = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      setTodosData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);

      if (error.message == "Network Error") {
        setLoader(true);
      } else {
        setLoader(false);
      }
    }
  };

  let getUsers = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users?_limit=5"
      );
      setUsersData(data);
      setLoader(false);
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
    getPosts();
    getComments();
    getAlbums();
    getPhotos();
    getTodos();
    getUsers();
  }, []);

  // let itemsData = [
  //   { name: "Posts", obj: comsData, val: ["title"] },
  //   { name: "Comments", obj: comsData, val: ["name", "email"] },
  //   { name: "Albums", obj: comsData, val: ["title"] },
  // ];

  // start from skeletons!
  return (
    <div className="px-[20px] section">
      <div className="sec1">
        <div className="text-[20px] font-bold text-center py-2">Posts</div>
        <div className="flex flex-col gap-2">
          {postData.map((e) => {
            return (
              <Link
                onClick={() => dispatch(setLink("/"))}
                to={`/posts/${e.id}`}
                key={e.id}
                className="underline text-[17px] hover:text-[#4192df]"
              >
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
          <Link to={"/posts"}>
            <Button variant="outlined">See more posts</Button>
          </Link>
        </div>
      </div>
      <div className="sec2">
        <div className="text-[20px] font-bold text-center py-2">Albums</div>
        <div className="flex flex-col gap-2">
          {AlbData.map((e) => {
            return (
              <Link
                onClick={() => dispatch(setLink("/"))}
                to={`/albums/${e.id}`}
                key={e.id}
                className="underline text-[17px] hover:text-[#4192df]"
              >
                {e.title}
              </Link>
            );
          })}
        </div>

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
          <Link to={"/albums"}>
            <Button variant="outlined">See more albums</Button>
          </Link>
        </div>
      </div>
      <div className="sec3">
        <div className="text-[20px] font-bold text-center py-2">Comments</div>
        <div className="flex flex-col gap-2">
          {comsData.map((e) => {
            return (
              <Link
                onClick={() => dispatch(setLink("/"))}
                to={`/comments/${e.id}`}
                key={e.id}
                className="flex duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454] flex-col rounded-md font-[400] border p-3 text-[16px]"
              >
                <div>{e.name}</div>
                <div>{e.email}</div>
              </Link>
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
          <Link to={"/comments"}>
            <Button variant="outlined">See more comments</Button>
          </Link>
        </div>
      </div>
      <div className="sec4">
        <div className="text-[20px] font-bold text-center py-2">Photos</div>
        <div className="flex flex-col gap-2">
          {photosData.map((e) => {
            return (
              <Link
                onClick={() => dispatch(setLink("/"))}
                to={`/photos/${e.id}`}
                key={e.id}
                className="flex gap-[20px] max-w-full items-center duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454] rounded-md font-[400] border p-3 text-[16px]"
              >
                <div className="w-[40px] h-[40px]  max-w-full min-h-[30px] rounded-[100px] dark:text-black text-[#fff] bg-[#ccc] flex items-center text-[20px] justify-center ">
                  R
                </div>

                <div className="flex flex-col">
                  <div>Item {e.id}</div>
                  <div className="max-w-[250px] dark:text-[#ccc]">
                    {e.title}
                  </div>
                </div>
              </Link>
            );
          })}
          {loader || comsData == [] ? (
            <>
              <Loader type={"h1"} />
              <Loader type={"h1"} />
              <Loader type={"h1"} />
              <Loader type={"h1"} />
              <Loader type={"h1"} />
            </>
          ) : null}
        </div>

        <div className="flex justify-center py-2">
          <Link to={"/photos"}>
            <Button variant="outlined">See more photos</Button>
          </Link>
        </div>
      </div>
      <div className="sec5">
        <div className="text-[20px] font-bold text-center py-2">Todos</div>
        {todosData.map((e) => {
          return (
            <Link
              to={`/todos/${e.id}`}
              key={e.id}
              className="py-2 flex text-[17px] hover:text-[#4192df] gap-3 "
            >
              <input type="checkbox" checked={e.completed} />
              <div
                style={
                  e.completed
                    ? { textDecoration: "line-through", color: "#4192df" }
                    : { textDecoration: "none" }
                }
              >
                {e.title}
              </div>
            </Link>
          );
        })}

        {loader || todosData == [] ? (
          <>
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
            <Loader type={"body"} />
          </>
        ) : null}

        <div className="flex justify-center py-2">
          <Link to={"/todos"}>
            <Button variant="outlined">See more todos</Button>
          </Link>
        </div>
      </div>
      <div className="sec6">
        <div className="text-[20px] font-bold text-center py-2">Users</div>
        <div className="flex flex-col gap-2">
          {usersData.map((e) => {
            return (
              <Link
                to={`/users/${e.id}`}
                key={e.id}
                className="flex gap-[20px] max-w-full items-center duration-300 dark:hover:border-[#fff] hover:border-black dark:border-[#5e5454] rounded-md font-[400] border p-3 text-[16px]"
              >
                <div className="w-[40px] h-[40px] rounded-[100px] dark:text-black text-[#fff] bg-[#ccc] flex items-center text-[20px] justify-center ">
                  {e.name.at(0)}
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-col dark:text-[#ccc]">
                    <div className="font-medium">{e.name}</div>
                    <div className="text-[#3f3939] dark:text-[#ccc]">
                      {e.email}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {loader || usersData == [] ? (
            <>
              <Loader type={"h1"} />
              <Loader type={"h1"} />
              <Loader type={"h1"} />
              <Loader type={"h1"} />
              <Loader type={"h1"} />
            </>
          ) : null}
        </div>

        <div className="flex justify-center py-2">
          <Link to={"/users"}>
            <Button variant="outlined">See more users</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
