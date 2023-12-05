import { Card, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AlertContext } from "../components/Alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../state/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useContext(AlertContext);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleSubmit() {
    const data = {
      user: {
        email,
        password,
      },
    };
    fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          const data = res.json();
          Cookies.set("token", res.headers.get("Authorization"), {
            expires: 2,
            sameSite: "strict",
          });
          return data;
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setAlert({ text: "Registered successfully", type: "success" });
        dispatch(logIn(data.user));
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        console.error(err.response);
        setAlert({ text: err.message, type: "error" });
      });
  }

  return (
    <div className="m-auto w-4/6">
      <Card className="p-10">
        <h1 className="text-center mb-5 font-bold text-3xl">Login</h1>
        <form className="grid gap-y-5">
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your username/email"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <div className="flex justify-center">
            <Button onClick={() => handleSubmit()} variant="contained">
              Login
            </Button>
          </div>
        </form>
        <small className="mt-5">
          Need an account?{" "}
          <Link className="underline" to={"/register"}>
            Register
          </Link>
        </small>
      </Card>
    </div>
  );
}
