import React from "react";
import { aP } from "../APIs/API";
import { geocoding } from "../APIs/Geocoding";
export default function Aside({setData}) {
  geocoding()
  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
      city: formData.get("searchs"),
    };
    setData(body.city)
    return 
  };
  return (
    <>
      <div className="flex absolute bg-[#1E213A] z-50   h-screen md:w-[375px]   font-display  justify-center ">
        <form onSubmit={handle} className="">
          <p className="text-end py-5 px-2 text-white font-extrabold">X</p>
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
      </div>
      <div className="bg-[#1E213A] w-full h-screen md:w-[526px] 2xl:w-[90px] font-display ">
        <img
          className="absolute mt-8 opacity-15 h-80 md:w-[373px]  object-cover  "
          src="/public/Cloud-background.png"
          alt=""
        />
        <div className="flex   justify-around gap-10 pt-4 items-center">
          <div className="bg-[#6E707A]">
            <p className="text-white py-1 px-4">Search for places</p>
          </div>
          <div className="rounded-full bg-[#6E707A] p-1 w-8">
            <img src="location.svg" alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-20 mt-20 items-center">
          <img className="w-20 md:w-32" src="/public/states/01n.png" alt="" />
          <div>
            <p className="font-display text-white text-9xl font-semibold">
              26<span className="text-6xl text-gray-400">°C</span>
            </p>
          </div>
          <div className=" text-center flex flex-col gap-6">
            <p className="text-gray-400 font-display text-2xl font-bold">
              Mist
            </p>
            <div>
              <p className="text-gray-400 font-display text-sm font-semibold">
                Today : Mon, 17 Feb
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img className="w-5" src="location_on.svg" alt="" />
              <p className="text-gray-400 font-display text-sm font-semibold ">
                Nacajuca
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
