import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Login_Register/Register";
import Login from "./pages/Login_Register/Login";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { AlertProvider } from "./components/Alert";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logIn } from "./state/auth/authSlice";
import checkAuth from "./utils/checkAuth";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import Store from "./pages/Store/Store";
import Chat from "./pages/Chat/Chat";
import Today from "./pages/Admin/Today";
import Calendar from "./pages/Admin/Calendar/Calendar";
import AddItems from "./pages/Admin/AddItems";
import Invoice from "./pages/Admin/Invoice";
import Product from "./pages/Product";
import AppointmentNew from "./pages/AppointmentNew";
import AdminRoute from "./components/AdminRoute";
import AddUpdates from "./pages/Admin/AddUpdates";
import UpdateItems from "./pages/Admin/UpdateItems";
import UpdateUpdates from "./pages/Admin/UpdateUpdates";
import Updates from "./pages/Admin/Updates";
import AppointmentShow from "./pages/AppointmentShow";
import AppointmentUpdate from "./pages/AppointmentUpdate";
import AppointmentRequest from "./pages/Admin/AppointmentRequest";
import { CheckoutForm } from "./pages/Checkout";
import { CheckoutReturn } from "./pages/CheckoutReturn";
import OrderNew from "./pages/OrderNew";

function App() {
  const currentUser = useSelector((state) => state.auth.user);
  let dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!currentUser.id && token !== undefined) {
      fetch("http://localhost:3000/current_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status.code === 200) {
            dispatch(logIn(data.data));
          } else {
            Cookies.remove("token");
          }
        });
    }
  }, [currentUser, dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <main id="main" className="min-h-[89.7vh] mt-[5.4vh] flex">
        <AlertProvider>
          <Routes>
            <Route
              path="/"
              element={
                currentUser.admin ? (
                  <Today />
                ) : checkAuth() ? (
                  <HomeLoggedIn />
                ) : (
                  <Home />
                )
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/meeting/:id"
              element={
                <PrivateRoute>
                  <AppointmentShow />
                </PrivateRoute>
              }
            />

            <Route
              path="/reschedule/:id"
              element={
                <PrivateRoute>
                  <AppointmentUpdate />
                </PrivateRoute>
              }
            />

            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<Product />} />

            <Route
              path="/order/new"
              element={
                <PrivateRoute>
                  <OrderNew />
                </PrivateRoute>
              }
            />

            <Route
              path="/checkout/:type/:id"
              element={
                <PrivateRoute>
                  <CheckoutForm />
                </PrivateRoute>
              }
            />

            <Route
              path="/checkout/:type/:id/return"
              element={
                <PrivateRoute>
                  <CheckoutReturn />
                </PrivateRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />

            <Route path="/chat" element={<Chat />} />
            <Route path="appointment/new" element={<AppointmentNew />} />

            <Route
              path="/admin/today"
              element={
                <AdminRoute>
                  <Today />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/calendar"
              element={
                <AdminRoute>
                  <Calendar />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/addItems"
              element={
                <AdminRoute>
                  <AddItems />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/updateItems/:id"
              element={
                <AdminRoute>
                  <UpdateItems />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/updates"
              element={
                <AdminRoute>
                  <Updates />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/addUpdate"
              element={
                <AdminRoute>
                  <AddUpdates />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/updateUpdate/:id"
              element={
                <AdminRoute>
                  <UpdateUpdates />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/request"
              element={
                <AdminRoute>
                  <AppointmentRequest />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/invoices"
              element={
                <AdminRoute>
                  <Invoice />
                </AdminRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AlertProvider>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
