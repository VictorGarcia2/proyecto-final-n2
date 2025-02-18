import axios from "axios";

export const geocoding = () => {
    axios({
      method: 'get',
      url: `http://api.openweathermap.org/geo/1.0/direct?q=nacajuca&limit=5&appid=02cd14f791e3ce9764a5590ca5580724`,
    })
    .then(function (response) {
      
    });
  
  }