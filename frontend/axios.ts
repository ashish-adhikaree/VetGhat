import axios from "axios";
const Axios = (jwt:string) => {
  return axios.create({
    baseURL: `${process.env.STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export default Axios;
