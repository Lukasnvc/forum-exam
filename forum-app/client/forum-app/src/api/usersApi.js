import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const REGISTER = `${BASE_URL}/register`;
const LOGIN = `${BASE_URL}/login`;
const POST_LIKE = `${BASE_URL}/`;

export const registerUser = (user) => {
  return axios.post(REGISTER, user).then((response) => response.data);
};

export const loginUser = (user) => {
  return axios.post(LOGIN, user).then((response) => response.data);
};

export const patchLikesPostsUser = (userId, postId, postLikes) => {
  return axios
    .patch(`${BASE_URL}/user/${userId}/posts/${postId}`, postLikes)
    .then((response) => response.data);
};
