import { Post } from "@/types/PostType";
import { User } from "@/types/UserType";
import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<Post[]>("/posts");

const usePosts = (user: User | undefined) => {
    const fetchPosts = async (): Promise<Post[]> => {
        const params = user ? { userId: user.id } : {};
        return apiClient.getAll(params);
    };

    return useQuery<Post[], Error>({
        queryKey: user ? ["users", user.id, "posts"] : ["users", "posts"],
        queryFn: fetchPosts,
        staleTime: 1 * 60 * 1000, // 1 minute
        keepPreviousData: true, // Keep previous data when fetching new data
        placeholderData: keepPreviousData,
    } as UseQueryOptions<Post[], Error>);
};

export default usePosts;
