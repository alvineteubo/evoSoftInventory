import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { InventoryForm } from "./components/InventoryForm";
import { InventoryList } from "./components/InventoryList";

const router = createBrowserRouter([
  {
    path: "",
    loader: () => redirect("/inventory"),
  },
  {
    path: "/inventory",
    element: (
      <>
        <InventoryForm />
        <InventoryList />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
