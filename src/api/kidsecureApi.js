import axios from "axios";


const api = axios.create({
    baseURL: "https://kidsecure-api-production.up.railway.app/api",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// export const apiWithToken = axios.create({
//     baseURL: "https://kidsecure.herokuapp.com/api/v1/",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//     },
// });

// export const apiWithoutToken = axios.create({
//     baseURL: "https://kidsecure.herokuapp.com/api/v1/",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
// });

export const convertToJSONString = (obj) => {
    return JSON.stringify(obj);
  }

  export default api;