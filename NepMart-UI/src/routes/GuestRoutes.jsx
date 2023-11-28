import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import MinimumLayout from "../layout/MinimumLayout";
import GuestGuard from "../guard/GuestGuard";

const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimumLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default guestRoutes;
