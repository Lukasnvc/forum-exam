import { BASE_URL } from "./questionsApi";
import axios from "axios";

export const postAnswer = (post, x) => {
  console.log(post, x);
  return axios.post(`${BASE_URL}/questions/${x}/answers`, post).then((response) => response.data);
};

export const deleteAnswer = (id) => {
  console.log(id);
  return axios.delete(`${BASE_URL}/answers/${id}`).then((response) => response.data);
};
