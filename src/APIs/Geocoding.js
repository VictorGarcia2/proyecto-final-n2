import axios from "axios";

export const geocoding = (data) => {
    axios({
      method: 'get',
      url: `https://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=5&appid=02cd14f791e3ce9764a5590ca5580724`,
    })
    
  }
