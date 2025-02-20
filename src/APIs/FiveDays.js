import axios from "axios";

export const fiveDays = async (city, country) => {
  return axios({
    method: 'get',
    url: `/src/w.json`,
  })
}
