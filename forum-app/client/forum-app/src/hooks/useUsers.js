import { loginUser, registerUser } from "../api/usersApi";

import { useMutation } from "@tanstack/react-query";

export const useRegisterUser = () => {
  return useMutation(registerUser);
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};
