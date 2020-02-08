import axios from "axios";
export default {
  setupInterceptors: () => {
    axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        console.log(response.status)
        if(response.status > 399) {
          return { ...response, success: false };
        }
        else return { ...response, success: true }
      },
     function(error) {
        // Do something with response error
        if(error.response) {
        const { status } = error.response
        if (status === 403 || status === 401) {
          localStorage.clear()
          window.location.reload();
        }
        /*return new window.Promise.reject(...error);*/
      }
      }
    );
  }
};