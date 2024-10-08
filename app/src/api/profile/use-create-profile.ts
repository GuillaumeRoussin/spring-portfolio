import {useApiError} from "@/api/use-api-error.ts";
import {useToast} from "@/hooks/use-toast.ts";
import axiosInstance from "@/api/axios-instance.ts";
import {useMutation} from "react-query";
import {ProfileInput, ProfileSchemaResponse, ENDPOINT_USER} from "@/api/profile";
import {AxiosError} from "axios";
import {clearAllCache} from "@/api/clearAllCache.ts";
import {CACHE_KEYS} from "@/api/user";

export function useCreateProfile() {
    const handleApiError = useApiError();
    const {toast} = useToast();
    return useMutation(
        async (payload: ProfileInput) => {
            const res = await axiosInstance.post(ENDPOINT_USER, payload, {headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}}).then((response) => response.data);
            const parsedResponse = ProfileSchemaResponse.parse(res);

            return parsedResponse ?? null;
        },
        {
            onSuccess: (_) => {
                clearAllCache(CACHE_KEYS);
                toast({title: "Profile successfully created"});
            },
            onError: (err: AxiosError) => {
                handleApiError(err, "Unable to create a profile");
            },
        }
    );
}