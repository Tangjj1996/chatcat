import axios from "axios";

const axionInstance = axios.create({});

function commonErorr(error: any) {
  // do something with error
  // example: message/toast
  return Promise.reject(error);
}

axionInstance.interceptors.request.use(function request(config) {
  return config;
}, commonErorr);

axionInstance.interceptors.response.use(function response(config) {
  return config;
}, commonErorr);

export default axionInstance;
