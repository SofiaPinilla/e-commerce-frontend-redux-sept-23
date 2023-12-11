import axios from "axios";

const API_URL = "http://localhost:8080/products";

const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const like = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(API_URL + "/like/" + _id,{}, {
    headers: {
      authorization: token,
    },
  });
  return res.data
};
const productsService = {
  getAll,
  like
};

export default productsService;
