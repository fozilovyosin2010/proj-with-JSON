import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import PageId from "./pages/PageId/PageId";
import Layout from "./Layout/Layout";
import PageName from "./pages/PageName/PageName";
import Not4 from "./pages/Not4/Not4";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/:page/:id",
          element: <PageId />,
        },
        {
          path: "/:page",
          element: <PageName />,
        },
        {
          path: "*",
          element: <Not4 />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

// https://json-placeholder-pi.vercel.app/
// https://jsonplaceholder.typicode.com/

// for input -> https://mui.com/material-ui/react-text-field/
