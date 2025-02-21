import React, { use, useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import axios from "axios";

export default function Aside({
  setData,
  clima,
  setCountry,
  grados,
  setGrados,
}) {
  const tempData = clima?.data?.main?.temp;
  const tempC = parseFloat(tempData).toFixed(0) - 273;
  const tempF = Math.round((parseFloat(tempData).toFixed(9) - 273) * 1.8 + 32);
  const icon = clima?.data?.weather;
  const description = clima?.data?.weather;
  const [searchModal, setSearchModal] = useState(true);
  const today = new Date();
  const [searching, setSearching] = useState([]);
  const [city, setCity] = useState("");
  const handleclick = () => {
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
  };

  const toggleSearchModal = () => {
    setSearchModal(true);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=02cd14f791e3ce9764a5590ca5580724`,
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
    searching.find((item, index) => {
      if (index == e.target.id) {
        const country = item.country;
        const name = item.name;
        setCountry(country);
        setData(name);
        setSearchModal(true);
      }
    });
  };

  const [skele, setSkele] = useState(true);
  setTimeout(() => {
    setSkele(false);
  }, 2000);
  const load = () => {
    return (
      <>
        <div
          className={` ${
            searchModal && "hidden"
          }  flex flex-col  absolute bg-[#1E213A] z-50  h-screen md:w-[426px] lg:w-[575px]   font-display  `}
        >
          <form onSubmit={handle} className=" w-full  ">
            <p
              onClick={toggleSearchModal}
              className="text-end py-5 px-2  cursor-pointer text-white font-extrabold"
            >
              X
            </p>
            <div className="flex items-center  ">
              <div className="border-white border mx-4 text-gray-200 py-2 px-2 bg-[#1E213A] flex">
                <input
                  name="searchs"
                  className=" focus:outline-none focus:border-none focus:bg-none"
                  type="text"
                  placeholder="Search location"
                />
              </div>
              <button
                className="text-center bg-[#3C47E9] text-white px-3 py-1  cursor-pointer"
                type="submit"
              >
                {" "}
                Search{" "}
              </button>
            </div>
            <div className="w-45 h-auto z-50 ">
              {searching &&
                searching.map((item, index) => (
                  <p
                    onClick={handleSearch}
                    id={index}
                    className="cursor-pointer font-display p-2 text-gray-400 hover:border "
                  >
                    {item.name} | {item.country}
                  </p>
                ))}
            </div>
          </form>
        </div>
        <div className="bg-[#1E213A] relative  h-screen md:w-[475px] lg:w-[800px] font-display ">
          <img
            className=" absolute mt-12 z-0  opacity-15 h-80 md:w-full object-cover   "
            src="Cloud-background.png"
            alt=""
          />
          <div className="flex z-50   justify-around gap-10 pt-4 items-center">
            <div>
              <Skeleton
                baseColor="#100E1D"
                highlightColor="#1E213A"
                width={200}
                height={50}
              />
            </div>
            <div className="rounded-full">

            <Skeleton
                baseColor="#100E1D"
                highlightColor="#1E213A"
                width={50}
                height={50}
                circle
                />
                </div>
          </div>
          <div className="flex flex-col gap-20 mt-20 items-center">
            <Skeleton
              baseColor="#100E1D"
              highlightColor="#1E213A"
              width={200}
              height={200}
              circle
            />

            <div>
              <p className="font-display w-full text-9xl text-gray-400 font-semibold">
                <Skeleton
                  baseColor="#100E1D"
                  highlightColor="#1E213A"
                  width={200}
                />
              </p>
            </div>
            <div className=" text-center flex flex-col gap-6">
              {description &&
                description.map((item, index) => (
                  <p
                    key={index}
                    className="text-gray-400 font-display text-2xl font-bold"
                  >
                    <Skeleton
                      baseColor="#100E1D"
                      highlightColor="#1E213A"
                      width={200}
                    />
                  </p>
                ))}
              <div>
                <p className="text-gray-400 font-display text-sm font-semibold">
                  <Skeleton
                    baseColor="#100E1D"
                    highlightColor="#1E213A"
                    width={200}
                  />
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Skeleton
                  baseColor="#100E1D"
                  highlightColor="#1E213A"
                  width={100}
                />
                <p className="text-gray-400 font-display text-sm font-semibold ">
                  <Skeleton
                    baseColor="#100E1D"
                    highlightColor="#1E213A"
                    width={100}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  if (skele) {
    return load();
  } else {
    return (
      <>
        <div
          className={` ${
            searchModal && "hidden"
          }  flex flex-col  absolute bg-[#1E213A] z-50  w-full h-screen md:w-[426px] lg:w-[575px]   font-display  `}
        >
          <form onSubmit={handle} className=" w-full  ">
            <p
              onClick={toggleSearchModal}
              className="text-end py-5 px-8  cursor-pointer text-white font-extrabold"
            >
              X
            </p>
            <div className="flex items-center  ">
              <div className="border-white border mx-4 text-gray-200 py-2 px-2 bg-[#1E213A] flex">
                <img className="w-6 mx-2" src="search.svg" alt="" />
                <input
                  name="searchs"
                  className=" focus:outline-none focus:border-none focus:bg-none"
                  type="text"
                  placeholder="Search location"
                />
              </div>
              <button
                className="text-center bg-[#3C47E9] text-white px-3 py-1  cursor-pointer"
                type="submit"
              >
                {" "}
                Search{" "}
              </button>
            </div>
            <div className="w-45 h-auto z-50 ">
              {searching &&
                searching.map((item, index) => (
                  <p
                    onClick={handleSearch}
                    id={index}
                    className="cursor-pointer font-display p-2 text-gray-400 hover:border "
                  >
                    {item.name} | {item.country}
                  </p>
                ))}
            </div>
          </form>
        </div>
        <div className="bg-[#1E213A] relative  h-screen md:w-[475px] lg:w-[800px] font-display ">
          <img
            className=" absolute mt-12 z-0  opacity-15 h-80 md:w-full object-cover   "
            src="Cloud-background.png"
            alt=""
          />
          <div className="flex z-50   justify-around gap-10 pt-4 items-center">
            <div>
              <button
                onClick={() => setSearchModal(false)}
                className="text-white py-1 px-4 bg-[#6E707A] lg:w-[176px] cursor-pointer"
              >
                Search for places
              </button>
            </div>
            <a
              className="rounded-full bg-[#6E707A] p-1  w-8 cursor-pointer"
              onClick={handleclick}
            >
              <img className="cursor-pointer" src="location.svg" alt="" />
            </a>
          </div>
          <div className="flex flex-col gap-20 mt-20 items-center">
            {icon &&
              icon.map((item) => (
                <img
                  key={item.id}
                  className="w-20 md:w-56"
                  src={`states/${item.icon}.png`}
                  alt=""
                />
              ))}

            <div>
              <p className="font-display text-white text-9xl font-semibold">
                {grados === "°C" ? tempC : tempF}
                <span className="text-6xl text-gray-400">{grados}</span>
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
}
