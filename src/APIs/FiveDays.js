import axios from "axios";

export const fiveDays = async (city, country) => {
  return axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=02cd14f791e3ce9764a5590ca5580724`,
  })
}
