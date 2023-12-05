import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AlertContext } from "../components/Alert";
import { logIn } from "../state/auth/authSlice";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const { setAlert } = useContext(AlertContext);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleSubmit() {
    const data = {
      user: {
        email,
        password,
        password_confirmation,
      },
    };
    fetch("http://localhost:3000/users", {
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
        setAlert({ text: err.message, type: "error" });
      });
  }

  return (
    <div className="m-auto w-4/6">
      <Card className="p-10">
        <h1 className="text-center mb-5 font-bold text-3xl">Register</h1>
        <form className="grid gap-y-5">
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <TextField
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            type="password"
            placeholder="Enter your password confirmation"
          />
          <div className="flex justify-center">
            <Button onClick={() => handleSubmit()} variant="contained">
              Register
            </Button>
          </div>
        </form>
        <small className="mt-5">
          Already have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login
          </Link>
        </small>
      </Card>
    </div>
  );
}
