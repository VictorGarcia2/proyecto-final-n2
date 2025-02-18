import axios from "axios";

export const aP = (data) => {
  return axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=02cd14f791e3ce9764a5590ca5580724`,
  });
}
