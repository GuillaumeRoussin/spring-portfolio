import {ENDPOINT, SignupInput} from "@/api/authentication";
import {useMutation} from "react-query";
import axiosInstance from "@/api/axios-instance";
import {AxiosError} from "axios";
import {useApiError} from "@/api/use-api-error";
import {useToast} from "@/hooks/use-toast.ts";
import {UserMeSchemaResponse} from "@/api/user";

export function useAuthenticationSignup() {
    const handleApiError = useApiError();
    const {toast} = useToast();
    return useMutation(
        async (payload: SignupInput) => {
            const res = await axiosInstance.post(ENDPOINT + 'signup', payload).then((response) => response.data);
            const parsedResponse = UserMeSchemaResponse.parse(res);

            return parsedResponse ?? null;
        },
        {
            onSuccess: (_) => {
                toast({title: "Account successfully created"});
            },
            onError: (err: AxiosError) => {
                handleApiError(err, "Unable to create an account");
            },
        }
    );
}