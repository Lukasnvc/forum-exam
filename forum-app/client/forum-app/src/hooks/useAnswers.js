import { postAnswer } from "../api/answersApi";
import { useMutation } from "@tanstack/react-query";

const ANSWER = "ANSWER";

export const usePostAnswer = (id, post) => {
  return useMutation([ANSWER], () => postAnswer(id, post));
};
