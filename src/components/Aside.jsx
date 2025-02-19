import React, { use, useEffect, useState } from "react";
import { aP } from "../APIs/API";
import { geocoding } from "../APIs/Geocoding";
import axios from "axios";
export default function Aside({ setData, clima, setCountry, setName, country, name }) {
  const tempData = clima?.data?.main?.temp;
  const temp = parseFloat(tempData).toFixed(0) - 273;
  const icon = clima?.data?.weather;
  const description = clima?.data?.weather;
  const [searchModal, setSearchModal] = useState(true);
  const today = new Date();
  const [searching, setSearching] = useState([]);
  const [city, setCity] = useState("");

  
  const toggleSearchModal = () => {
    setSearchModal(true);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=02cd14f791e3ce9764a5590ca5580724`,
    })
      .then((response) => {
        setSearching(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [city]);

  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
      city: formData.get("searchs"),
    };
    setCity(body.city);
  };
  const handleSearch = (e) => {
    setData(e.target.textContent)
    searching.find((item, index) => {
      if(index == e.target.id){
        const country = item.country;
        const name = item.name;
        setCountry(country);
        setData(name);
      }
    });
 
  }

  return (
    <>
      <div
        className={` ${
          searchModal || "hidden"
        }  flex flex-col  absolute bg-[#1E213A] z-50  h-screen md:w-[426px] lg:w-[475px]   font-display  `}
      >
        <form onSubmit={handle} className=" w-full px-10">
          <p
            onClick={toggleSearchModal}
            className="text-end py-5 px-2  cursor-pointer text-white font-extrabold"
          >
            X
          </p>
          <input
            name="searchs"
            className="border-white border mx-4 text-gray-200"
            type="text"
            placeholder="Search..."
          />
          <button
            className="text-center bg-blue-700 text-white px-2 py-1 rounded"
            type="submit"
          >
            {" "}
            Search{" "}
          </button>
        </form>
        <div className="bg-white w-45 h-auto mx-10 rounded-b-lg">
          { searching &&
           searching.map((item, index) => (
             <p onClick={handleSearch} id={index} className="cursor-pointer font-display p-2 hover:bg-gray-300 rounded-b-lg">
              {item.name} | {item.country}
             </p>
          ))
          }
        </div>
      </div>
      <div className="bg-[#1E213A]  h-screen md:w-[475px] lg:w-[475px] font-display ">
        <img
          className="absolute mt-8 opacity-15 h-80 md:w-[373px]  object-cover  "
          src="/public/Cloud-background.png"
          alt=""
        />
        <div className="flex   justify-around gap-10 pt-4 items-center">
          <div className=" cursor-pointer">
            <button
              onClick={() => setSearchModal(false)}
              className="text-white py-1 px-4 bg-[#6E707A]"
            >
              Search for places
            </button>
          </div>
          <div className="rounded-full bg-[#6E707A] p-1 w-8">
            <img src="location.svg" alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-20 mt-20 items-center">
          {icon &&
            icon.map((item) => (
              <img
                key={item.id}
                className="w-20 md:w-32"
                src={`/public/states/${item.icon}.png`}
                alt=""
              />
            ))}

          <div>
            <p className="font-display text-white text-9xl font-semibold">
              {temp}
              <span className="text-6xl text-gray-400">°C</span>
            </p>
          </div>
          <div className=" text-center flex flex-col gap-6">
            {description &&
              description.map((item, index) => (
                <p
                  key={index}
                  className="text-gray-400 font-display text-2xl font-bold"
                >
                  {item.description}
                </p>
              ))}
            <div>
              <p className="text-gray-400 font-display text-sm font-semibold">
                {today.toDateString()}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img className="w-5" src="location_on.svg" alt="" />
              <p className="text-gray-400 font-display text-sm font-semibold ">
                {clima?.data?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
