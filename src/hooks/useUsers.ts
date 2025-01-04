import { User } from "@/types/UserType";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<User[]>("/users");

const useUsers = () => {
    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: apiClient.getAll,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export default useUsers;
