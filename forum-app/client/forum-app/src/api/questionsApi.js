import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const GET_ALL = `${BASE_URL}/questions`;
const POST_QUESTION = `${BASE_URL}/questions`;

export const fetchQuestions = () => {
  return axios.get(GET_ALL).then((response) => response.data);
};

export const postQuestion = (post) => {
  return axios.post(POST_QUESTION, post).then((response) => response.data);
};
