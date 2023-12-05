import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AlertContext } from "../components/Alert";

export default function Home() {
  const [data, setData] = useState(null);
  const {setAlert} = useContext(AlertContext);
  
  useEffect(() => {
    fetch("https://randomuser.me/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }else{
          throw new Error("Error");
        }
      })
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button onClick={() => setAlert({text:"test", type:"success"})} variant="contained">
        Button
      </Button>
      {data && (
        <div>
          <p>{data.results[0].gender}</p>
          <p>{data.results[0].email}</p>
        </div>
      )}
    </div>
  );
}
