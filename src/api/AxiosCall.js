//Usually i use This folder for creating axios baze calls easy to modify url if needed(or server change)
import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5000/",
});
