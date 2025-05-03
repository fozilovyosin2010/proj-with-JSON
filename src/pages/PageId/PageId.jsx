import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Skeleton2 from "../../Component/Skeleton";

const PageId = () => {
  let params = useParams();

  let [pageIdData, setPageIdData] = useState([]);
  let [loader, setLoader] = useState(false);

  // {params.page} {params.id}

  let getParamsId = async () => {
    setLoader(true);
    try {
      let { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/${params.page}/${params.id}`
      );
      setPageIdData(showKeys(params.page, data));
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getParamsId();
  }, []);

  // {userId: 1, id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', body: 'quia et suscipit\nsuscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto'}
  function showKeys(page, obj) {
    let findId = Object.entries(obj)
      .filter((e) => {
        return (
          e[0].toLowerCase().includes("id") ||
          e[0] == "thumbnailUrl" ||
          e[0] == "url"
        );
      })
      .map((e) => {
        return e[0];
      });

    if (page == "users") {
      let addressData = Object.values(Object.values(obj)[4]);

      return Object.entries(obj)
        .filter((e, i) => {
          if (i == 4) {
            e[1] = [addressData[0], addressData[2]].join(", ");
          }
          return !findId.includes(e[0]);
        })
        .slice(0, 6);
    } else {
      if (page == "todos") {
        return Object.entries(obj)
          .filter((e) => {
            return !findId.includes(e[0]);
          })
          .toReversed();
      } else {
        return Object.entries(obj).filter((e) => {
          return !findId.includes(e[0]);
        });
      }
    }
  }
  let backl = useSelector((e) => e.backL.val);
  return (
    <div className="section p-[15px_10px] flex flex-col">
      <Link to={backl}>
        <Button
          variant="outlined"
          className="border-[3px] flex gap-1 items-center"
        >
          <span>Go back</span>
          <span className="MuiButton-endIcon MuiButton-iconSizeMedium css-1n4a93h text-[18px]">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.2"
              baseProfile="tiny"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.164 19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0 .534-.208 1.036-.586 1.414-.756.756-2.077.751-2.823.005l-6.293-6.207c-.191-.189-.298-.444-.298-.713s.107-.524.298-.712l6.288-6.203c.754-.755 2.073-.756 2.829.001.377.378.585.88.585 1.414v1.704c4.619.933 8 4.997 8 9.796v1c0 .442-.29.832-.714.958-.095.027-.19.042-.286.042-.331 0-.646-.165-.836-.452zm-7.141-5.536c2.207.056 4.638.394 6.758 2.121-.768-3.216-3.477-5.702-6.893-6.08-.504-.056-.888-.052-.888-.052v-3.497l-5.576 5.496 5.576 5.5v-3.499l1.023.011z"></path>
            </svg>
          </span>
        </Button>
      </Link>

      <div className="pt-[20px]">
        {loader && params.page == "posts" ? (
          <div>
            <Skeleton2 type={"caption"} width={true} center={true} />
            <Skeleton2 type={"body1"} />
          </div>
        ) : (loader && params.page == "albums") ||
          (loader && params.page == "photos") ||
          (loader && params.page == "todos") ? (
          <Skeleton2 type={"caption"} center={true} />
        ) : (loader && params.page == "comments") ||
          (loader && params.page == "users") ? (
          <div>
            <Skeleton2 type={"body1"} width={true} />
            <Skeleton2 type={"body1"} width={true} />
            <Skeleton2 type={"body1"} width={true} />
            <Skeleton2 type={"body1"} width={true} />
          </div>
        ) : null}
        <div
          style={
            params.page == "todos"
              ? { display: "flex", gap: "8px", justifyContent: "center" }
              : null
          }
        >
          {pageIdData.map((e, i) => {
            if (
              params.page == "posts" ||
              params.page == "albums" ||
              params.page == "photos"
            ) {
              return (
                <div key={i} className="flex justify-center text-[16px]">
                  <div
                    style={
                      i == 0
                        ? {
                            fontWeight: "600",
                            fontSize: "18px",
                            textAlign: "center",
                          }
                        : null
                    }
                  >
                    {e[1]}
                  </div>
                </div>
              );
            } else if (params.page == "comments" || params.page == "users") {
              return (
                <div key={i} className="flex  gap-2">
                  <div>{e[0]}:</div>

                  <div className="font-medium">
                    {e[0] == "website" ? (
                      <a
                        target="_blank"
                        href={`http://${e[1]}`}
                        style={
                          e[0] == "website"
                            ? { textDecoration: "underline" }
                            : null
                        }
                      >
                        {e[0] == "username" ? `@${e[1]}` : e[1]}
                      </a>
                    ) : (
                      <div>
                        {e[0] == "username"
                          ? `@${e[1]}`
                          : e[0] == "phone"
                          ? `+${e[1]}`
                          : e[1]}
                      </div>
                    )}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex items-center">
                  {e[0] == "completed" ? (
                    <input key={i} type="checkbox" checked={e[1]} />
                  ) : (
                    <div key={i} className="text-[18px] font-medium">
                      {e[1]}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PageId;
