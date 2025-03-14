import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loader from "../../Component/Skeleton";
const Home = () => {
  let [postData, setPostData] = useState([]);
  let [loaderPost, setLoaderPost] = useState(false);

  let [comsData, setComsData] = useState([]);
  let [loaderComs, setLoaderComs] = useState(false);

  let getPosts = async () => {
    setLoaderPost(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPostData(data.slice(0, 5));
      setLoaderPost(false);
    } catch (error) {
      console.error(error);
      setLoaderPost(false);
    }
  };
  let getComments = async () => {
    setLoaderComs(true);
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setComsData(data.slice(0, 5));
      setLoaderComs(false);
    } catch (error) {
      console.error(error);
      setLoaderComs(false);
    }
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  return (
    <div className="max-w-[1200px] p-2 m-[0_auto]">
      <div className="sec1">
        <div className="text-[20px] font-bold text-center ">Posts</div>
        {postData.map((e) => {
          return (
            <div key={e.id} className="underline">
              {e.title}
            </div>
          );
        })}

        {loaderPost ? (
          <>
            <Loader />
            <Loader />
            <Loader />
            <Loader />
            <Loader />
          </>
        ) : null}

        <div className="flex justify-center py-2">
          <Button variant="outlined">See more posts</Button>
        </div>
      </div>
      <div className="sec2">
        <div className="text-[20px] font-bold text-center p-2">Coments</div>
        <div className="flex flex-col gap-2">
          {comsData.map((e) => {
            return (
              <div
                key={e.id}
                className="flex flex-col rounded-md border p-2 text-[16px]"
              >
                <div>{e.name}</div>
                <div>{e.email}</div>
              </div>
            );
          })}
          {loaderComs ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : null}
        </div>

        <div className="flex justify-center py-2">
          <Button variant="outlined">See more comments</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
