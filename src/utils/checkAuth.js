import Cookies from "js-cookie";

export default function checkAuth() {
  return Cookies.get("token") !== undefined ? true : false;
}
