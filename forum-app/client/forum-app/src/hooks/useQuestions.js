import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { fetchQuestions, postQuestion } from "../api/questionsApi";

const QUESTIONS = "QUESTIONS_DATA";

export const useGetQuestions = () => {
  return useQuery([QUESTIONS], () => {
    return fetchQuestions();
  });
};

export const usePostQuestion = () => {
  return useMutation(postQuestion);
};
