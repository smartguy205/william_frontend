import axios from "axios";

export const getJobs = (data) => {
    console.log("axios.data", data)
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/admin/jobs/${data?.position}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
