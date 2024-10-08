import {CACHE_KEYS, ENDPOINT, UserMeSchemaResponse} from "@/api/user";
import axiosInstance from "@/api/axios-instance";
import {useQuery} from "react-query";

export const useMe = () => {
    return useQuery({
        queryKey: [CACHE_KEYS.USER_ME],
        queryFn: async () => {
            const res = await axiosInstance
                .get(`${ENDPOINT + 'me'}`, {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                })
                .then((response) => response.data);
            return UserMeSchemaResponse.parse(res);
        },
    });
};