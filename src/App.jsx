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
import { useEffect, useState } from "react";
import { AlertProvider } from "./components/Alert";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logIn } from "./state/auth/authSlice";
import checkAuth from "./utils/checkAuth";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import Store from "./pages/Store";
import Chat from "./pages/Chat/Chat";
import Today from "./pages/Admin/Today";
import Calendar from "./pages/Admin/Calendar/Calendar";
import AddArticles from "./pages/Admin/AddArticles";
import Request from "./pages/Admin/Request";
import Invoice from "./pages/Admin/Invoice";
import Product from "./pages/Product";

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
          console.log(data)
          dispatch(logIn(data.user));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser, dispatch]);


  return (
    <BrowserRouter>
      <Navbar/>
      <main id="main" className="min-h-[89.7vh] mt-[5.4vh] flex">
        <AlertProvider>
          <Routes>
            <Route path="/" element={checkAuth() ? <HomeLoggedIn/> : <Home />} />
            {/* <Route path="/" element={<HomeLoggedIn/>} /> */}
            
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

            {/* <Route
              path="/chat/:id"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            /> */}
            <Route path="/chat" element={<Chat />} />


            <Route path="/store" element={<Store />} />
            <Route path="/product/:1" element={<Product />} />

            <Route path="/admin/today" element={<Today />} />
            <Route path="/admin/calendar" element={<Calendar />} />
            <Route path="/admin/addArticles" element={<AddArticles />} />
            <Route path="/admin/request" element={<Request />} />
            <Route path="/admin/invoices" element={<Invoice />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AlertProvider>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
