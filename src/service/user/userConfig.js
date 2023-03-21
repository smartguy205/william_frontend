import axios from "axios";

export const userCV = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/user/userCV`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const uploadFile = (fileObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/user/url`, fileObj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
