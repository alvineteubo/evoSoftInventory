import React from "react";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { InventoryForm } from "./components/InventoryForm";
import { InventoryList } from "./components/InventoryList";

const router = createBrowserRouter([
  {
    path: "",
    loader: () => redirect("/inventoryForm"),
  },
  {
    path: "/inventoryForm",
    element: <InventoryForm />,
  },
  {
    path: "/inventoryList",
    element: <InventoryList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
