import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./pages/LayoutAdmin";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRouter from "./pages/PrivateRouter";

const App = () => {
  return (
    <Routes>
      <Route path="admin" element={<LayoutAdmin />}>
        <Route
          path="products"
          element={
            <PrivateRouter>
              <Products />
            </PrivateRouter>
          }
        />
        <Route
          path="products/add"
          element={
            <PrivateRouter>
              <AddProduct />
            </PrivateRouter>
          }
        />
        <Route
          path="products/:id/edit"
          element={
            <PrivateRouter>
              <EditProduct />
            </PrivateRouter>
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default App;
