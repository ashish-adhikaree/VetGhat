import axios from "axios";
const Axios = () => {
  return axios.create({
    baseURL: `${process.env.STRAPI_URL}/api`,
    withCredentials: true
  });
};

export default Axios;
