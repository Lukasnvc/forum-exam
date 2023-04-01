import { BASE_URL } from "./questionsApi";
import axios from "axios";

export const postAnswer = (post, x) => {
  return axios.post(`${BASE_URL}/questions/${x}/answers`, post).then((response) => response.data);
};
