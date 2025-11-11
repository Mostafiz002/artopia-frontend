import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = user.accessToken;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    //response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      axiosInstance.interceptors.response.use(
        (res) => {
          return res;
        },
        (err) => {
          const status = err.status;
          if (status === 401 || status === 403) {
            signOutUser().then(() => {
              navigate("/register");
            });
          }
        }
      )
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, signOutUser]);

  return axiosInstance;
};

export default useAxiosSecure;
