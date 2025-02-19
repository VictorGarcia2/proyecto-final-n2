import React, { useEffect, useState } from "react";
import Aside from "./components/Aside";
import Main from "./components/Main";
import axios from "axios";

export default function App() {
  const [data, setData] = useState("");
  const [clima, setClima] = useState([]);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: `https://ipinfo.io/json?token=3201fc784397f4`,
    })
      .then((response) => {
        setData(response?.data?.city);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <div className="md:flex">
        <Aside data={data} clima={clima} setClima={setClima} setData={setData} setCountry={setCountry} country={country} setName={setName} name={name} />
       
          <Main data={data} clima={clima} setClima={setClima} setData={setData} setCountry={setCountry} country={country} setName={setName} name={name} />
      
      </div>
    </>
  );
}
