import { User } from "@/types/UserType";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<User[]>("/users");

const useUsers = () => {
    const fetchUsers = async (): Promise<User[]> => await apiClient.getAll();

    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export default useUsers;
