import { useEffect, useState } from "react";
import { aP } from "../APIs/API"; // Ensure that aP is correctly exported from the API module
import { fiveDays } from "../APIs/FiveDays";

export default function Main({
  data,
  setClima,
  clima,
  country,
  grados,
  setGrados,
}) {

  const humedad = clima?.data?.main?.humidity;
  const airPressure = clima?.data?.main?.pressure;
  const wind = clima?.data?.wind?.speed;
  const visibility = clima?.data?.visibility;
  const [fiveDay, setFiveDay] = useState([]);
  const deg = clima?.data?.wind?.deg;
  const elDato = `${data},${country}`;
  const today = new Date();
  const rs = [];

  const current = new Date();

  const exist = (item) =>
    rs.some((weather) => {
      const date = new Date(weather.dt * 1000);
      const current = new Date(item.dt * 1000);
      return date.getDate() === current.getDate();
    });

  fiveDay.forEach((item) => {
    const date = new Date(item.dt * 1000);
    if (
      (current.getDate() < date.getDate() ||
        current.getMonth() <= date.getMonth()) &&
      !exist(item)
    )
      rs.push(item);
  });

  const celsius = () => {
    setGrados("°C");
    setTempState(tempC);;
  };
  const fahrenheit = () => {
    setGrados("°F");
    setTempState(tempF);
   
  };

  useEffect(() => {
    aP(elDato)
      .then((response) => {
        setClima(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fiveDays(data, country)
      .then((response) => {
        setFiveDay(response.data.list);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [elDato]);
  return (
    <div className="bg-[#100E1D] w-full flex flex-col items-center  md:h-screen text-[#E7E7EB] pb-20 sm:pb-0">
      <div className=" flex pt-6  2xl:mt-16 flex-col justify-center w-full  items-center  ">
        <div className="flex  justify-end  gap-2 md:w-[692px]   px-4  md:py-4 py-4  ">
          <button
            onClick={celsius}
            className="rounded-full mx-24 sm:mx-0  w-10 h-10 bg-[#585676] cursor-pointer focus:bg-[#E7E7EB] text-white "
          >
            <p className="font-display  p-3  ">°C</p>
          </button>
          <button
            onClick={fahrenheit}
            className="rounded-full -mx-24 sm:mx-0  w-10 h-10 bg-[#585676] cursor-pointer focus:bg-[#E7E7EB] text-white "
          >
            <p className="font-display  p-3">°F</p>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex">
          {rs &&
            rs.splice(1, 5).map((li, index) => (
              <div
                key={index}
                className="bg-[#1E213A] w-32 h-40 text-center flex flex-col justify-evenly p-3 items-center"
              >
                <p className="font-display text-white">
                  {new Date(li.dt_txt).toString().split(" ")[0] +
                    ", " +
                    new Date(li.dt_txt).toString().split(" ")[2] +
                    " " +
                    new Date(li.dt_txt).toString().split(" ")[1]}
                </p>

                {li.weather.map((item) => (
                  <img
                    key={item.id}
                    className="w-10 h-auto"
                    src={`states/${item.icon}.png`}
                    alt=""
                  />
                ))}
                {grados === "°C" ? (
                  <div className="flex justify-center gap-2 pt-2">
                    <p className="text-white font-display">
                      {parseFloat(li?.main?.temp_min).toFixed(0) - 273}
                      {grados}
                    </p>
                    <p className="text-white font-display">
                      {parseFloat(li?.main?.temp_max).toFixed(0) - 273}
                      {grados}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center gap-2 pt-2">
                    <p className="text-white font-display">
                      {Math.round(
                        (parseFloat(li?.main?.temp_min).toFixed(9) - 273) *
                          1.8 +
                          32
                      )}
                      {grados}
                    </p>
                    <p className="text-white font-display">
                      {Math.round(
                        (parseFloat(li?.main?.temp_max).toFixed(9) - 273) *
                          1.8 +
                          32
                      )}
                      {grados}
                    </p>
                  </div>
                )}
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
                  <img
                    className="w-4"
                    style={{ transform: `rotate(${deg}deg)` }}
                    src="navigation.svg"
                    alt=""
                  />
                  {deg > 0 && deg < 90 ? (
                    <p>NE</p>
                  ) : deg > 90 && deg < 180 ? (
                    <p>SE</p>
                  ) : deg > 180 && deg < 270 ? (
                    <p>SW</p>
                  ) : deg > 270 && deg < 360 ? (
                    <p>NW</p>
                  ) : (
                    <p>ENE</p>
                  )}
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
                {grados === "°C" ? (
                  <p className=" font-extrabold text-6xl ">{clima?.data?.visibility / 1000} <span className="font-medium text-4xl"> Km </span> </p>
                ) : (
                  <p className=" font-extrabold text-6xl ">{Math.round(clima?.data?.visibility * 0.00062137.toFixed(4))} <span className="font-medium text-4xl"> Miles </span> </p>
                )}
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
