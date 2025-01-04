import { User } from "@/types/UserType";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/user-service";



const useUsers = () => {
    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: userService.getAll,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export default useUsers;
