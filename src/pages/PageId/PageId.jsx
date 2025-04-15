import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const PageId = () => {
  let params = useParams();

  let [pageIdData, setPageIdData] = useState([]);

  // {params.page} {params.id}

  let getParamsId = async (page, id) => {
    try {
      let { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/${page}/${id}`
      );
      setPageIdData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getParamsId(params.page, params.id);
  }, []);

  return (
    <div>
      {
        <div>{pageIdData.title}</div>
        // {/* return <div key={e.id}></div>; */}
      }
    </div>
  );
};

export default PageId;
