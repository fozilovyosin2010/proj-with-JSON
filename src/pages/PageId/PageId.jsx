import React from "react";
import { useParams } from "react-router-dom";
const PageId = () => {
  let params = useParams();

  return (
    <div>
      Page id - {params.page} {params.id}
    </div>
  );
};

export default PageId;
