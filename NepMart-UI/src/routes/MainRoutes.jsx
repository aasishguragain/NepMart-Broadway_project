import AddProductForm from "../components/AddProductForm";
import AuthGuard from "../guard/AuthGuard";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Cart from "../pages/Cart";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "products/add",
        element: <AddProductForm />,
      },
      {
        path: "products/details/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      { path: "/products/edit/:id", element: <EditProduct /> },
    ],
  },
];

export default mainRoutes;
