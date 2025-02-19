import { useEffect, useState } from "react";
import { aP } from "../APIs/API"; // Ensure that aP is correctly exported from the API module

export default function Main({ data, setClima, clima,setCountry, setName, country, name }) {
  const humedad = clima?.data?.main?.humidity;
  const airPressure = clima?.data?.main?.pressure;
  const wind = clima?.data?.wind?.speed;
  const visibility = clima?.data?.visibility;
  console.log(visibility)
  const elDato = `${data},${country}`;
  console.log(elDato)
  useEffect(() => {
    aP(elDato)
      .then((response) => {
        setClima(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [elDato]);

  const list = [
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
  ];
  return (
    <div className="bg-[#100E1D] w-full flex flex-col items-center  md:h-screen ">
      <div className="w-80 md:w-96 flex pt-6 flex-col justify-center  items-center ">
        <div className="flex text-center gap-2   justify-end p-4 md:py-4  w-full ">
          <div className="rounded-full w-10 h-10 bg-[#585676] ">
            <p className="font-display text-white p-3 items-center ">°C</p>
          </div>
          <div className="rounded-full w-10 h-10 bg-[#585676]">
            <p className="font-display text-white p-3">°F</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex">
          {list &&
            list.map((li, index) => (
              <div
                key={index}
                className="bg-[#1E213A] w-32 h-40 text-center flex flex-col p-3 items-center"
              >
                <p className="font-display text-white">Tomorrow</p>
                <img className="w-17" src="states/11n.png" alt="" />
                <div className="flex justify-center gap-2 pt-2">
                  <p className="text-white font-display">27°C</p>
                  <p className="text-white font-display">21°C</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {
        <div className="mt-15 w-full flex flex-col justify-center items-center">
          <div className="w-full grid place-content-center  ">
            <p className="font-display text-start text-white text-2xl font-bold">
              Today's Hightlights
            </p>
            <div className=" grid   grid-cols-1 gap-3 md:grid-cols-2  ">
              <div className="bg-[#1E213A]  grid place-content-center gap-10 w-72 h-48 md:w-80 text-center text-white font-display">
                <p>Wind status</p>
                <p className="text-5xl font-bold">{wind}</p>
                <div className="flex items-center justify-center">
                  <img className="w-4" src="navigation.svg" alt="" />
                  <p>ENE</p>
                </div>
              </div>
              <div className="bg-[#1E213A] grid place-content-center gap-10 h-48 md:w-80 text-center text-white font-display">
                <p>Humidity</p>
                <p className="text-5xl font-bold">{`${humedad || 0}%`}</p>
                <div className="flex flex-col items-center  justify-center">
                  <div className="flex -mt-10 gap-15">
                    <p className="mb-6 text-sm">0%</p>
                    <p className="mb-6 text-sm">50%</p>
                    <p className="mb-6 text-sm">100%</p>
                  </div>
                  <div className="bg-amber-300 w-[200px] mt-1  rounded-4xl h-2">
                    <div
                      className="bg-white h-2 rounded-4xl"
                      style={{ width: `${humedad}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="bg-[#1E213A] grid place-content-center gap-5 h-36 md:w-80  text-center text-white font-display">
                <p>Visibility</p>
                <p className="text-5xl font-bold">{visibility}M</p>
              </div>
              <div className="bg-[#1E213A] grid place-content-center gap-5 h-36 md:w-80  text-center text-white font-display">
                <p>Air Pressure</p>
                <p className="text-5xl font-bold">{airPressure}mb</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
