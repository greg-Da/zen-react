import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AlertContext } from "../../components/Alert";
import { logIn } from "../../state/auth/authSlice";
import "./style.css";
import apiUrl from "../../ApiConfig";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { setAlert } = useContext(AlertContext);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation,
      },
    };
    fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          Cookies.set("token", res.headers.get("Authorization"), {
            expires: 1,
            sameSite: "strict",
          });
        }
        const data = res.json();
        return data;
      })
      .then((data) => {
        console.log(data);

        if (data.status.code !== 200) {
          throw new Error(data.status.message);
        }

        setAlert({ text: "Registered successfully", type: "success" });
        dispatch(logIn(data.data));
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setAlert({ text: err.message, type: "error" });
      });
  }

  function checkPassword(value) {
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;

    const containsDigit = digitRegex.test(value);
    const containsSpecialChar = specialCharRegex.test(value);
    const containsUppercase = uppercaseRegex.test(value);

    setIsValid(containsDigit && containsSpecialChar && containsUppercase);
    setPassword(value);
  }

  return (
    <div className="backgroundLeaves flex w-full bg-beige relative">
      <div className="m-auto w-4/6">
        <Card className="p-10 border-2 border-black">
          <h1 className="text-center mb-5 font-bold text-3xl">Register</h1>
          <form className="grid gap-y-5">
            <TextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Enter your first name"
            />
            <TextField
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Enter your last name"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
            />
            <TextField
              className={`${isValid ? "" : ""}`}
              value={password}
              onChange={(e) => checkPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
            <small className={`${isValid ? "hidden" : "block"} text-red-500`}>
              Your password needs to be at least 6 characters long and to include an uppercase letter, a digit and a
              special character
            </small>

            <TextField
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              type="password"
              placeholder="Enter your password confirmation"
            />

            <div className="flex justify-center">
              <button
                className="bg-green px-3 py-2 rounded-full text-white font-bold"
                onClick={(e) => handleSubmit(e)}
              >
                Register
              </button>
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
    </div>
  );
}
