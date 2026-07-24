import { useMemo } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    const axiosPrivate = useMemo(() => {
        const instance = axios.create({
            baseURL: axios.defaults.baseURL,
        });

        if (auth.accessToken) {
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${auth.accessToken}`;
        }

        return instance;
    }, [auth.accessToken]);

    return axiosPrivate;
};

export default useAxiosPrivate;