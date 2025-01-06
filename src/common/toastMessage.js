import { toast as toastDefault } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const options = {
  autoClose: 3000,
  pauseOnHover: false,
};

const toast = ["success", "error", "info", "warning"].reduce((result, type) => {
  result[type] = (message) => toastDefault[type](message, options);
  return result;
}, {});

export { toast };

/*
toast.success("green");
toast.error("red");
toast.info("blue");
toast.warning("yellow");
*/
