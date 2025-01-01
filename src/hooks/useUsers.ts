import axios from "axios";
import { User } from "@/types/UserType";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
    const fetchUsers = async (): Promise<User[]> => await axios
        .get<User[]>('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.data);

    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export default useUsers;
