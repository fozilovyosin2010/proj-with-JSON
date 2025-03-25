import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Albums from "./pages/Albums/Albums";
import Comments from "./pages/Coments/Coments";
import Photos from "./pages/Photos/Photos";
import Posts from "./pages/Posts/Posts";
import Todos from "./pages/Todos/Todos";
import Users from "./pages/Users/Users";
import Home from "./pages/Home/Home";
import PageId from "./pages/PageId/PageId";
import Layout from "./Layout/Layout";
import PageName from "./pages/PageName/PageName";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

// https://json-placeholder-pi.vercel.app/
// https://jsonplaceholder.typicode.com/

// for input -> https://mui.com/material-ui/react-text-field/
