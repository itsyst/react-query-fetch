import { Post } from "@/types/PostType";
import { User } from "@/types/UserType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePosts = (user: User | undefined) => {
    const fetchPosts = async (): Promise<Post[]> => await axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', { params: { userId: user?.id } })
        .then((res) => res.data);

    return useQuery<Post[], Error>({
        queryKey: user ? ['users', user?.id, 'posts'] : ['users', 'posts'],
        queryFn: fetchPosts,
        staleTime: 1 * 60 * 1000 // 1m
    });
}

export default usePosts;