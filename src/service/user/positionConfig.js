import { resolve } from "@sentry/utils";
import axios from "axios";

// export const userCV = (data) => {
//     console.log("axios.data", data)
//   return new Promise((resolve, reject) => {
//     axios
//       .post(`${process.env.REACT_APP_SERVER}/user/userCV`, data)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err.response);
//       });
//   });
// };

export const getJobPositionByCountry = () => {
   return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_SERVER}/user/getposition`).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err.response)
    })
   }) 
}