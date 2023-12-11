import Cookies from "js-cookie";

export default function checkAdmin() {
  return Cookies.get("token") !== undefined
    ? fetch("http://localhost:3000/is_admin")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          return data;
        })
    : false;
}
