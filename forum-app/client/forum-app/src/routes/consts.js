import AddPost from "../pages/AddPost";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import Post from "../pages/Post";
import Register from "../pages/Register";

export const HOME_PATH = "/";
export const ADD_PATH = "/add";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const POST_PATH = "/question";

export const mainLayoutRoutes = {
  Layout: MainLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: POST_PATH, Component: Post },
    { path: ADD_PATH, Component: AddPost },
  ],
};

export const authLayoutRoutes = {
  Layout: AuthLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: LOGIN_PATH, Component: Login },
    { path: REGISTER_PATH, Component: Register },
  ],
};
