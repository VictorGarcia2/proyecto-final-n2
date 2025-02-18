import React, { useEffect, useState } from "react";
import Aside from "./components/Aside";
import Main from "./components/Main";
import axios from "axios";


export default function App() {
  const [data, setData] = useState("")


  useEffect(() => {
    axios({
      method: 'get',
      url: `https://ipinfo.io/json?token=3201fc784397f4`,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);





  return (
    <>
      <div className="md:flex">
        <Aside  data={data} setData={setData}/>
        <Main data={data}  setData={setData}/>
      </div>
    </>
  );
}
