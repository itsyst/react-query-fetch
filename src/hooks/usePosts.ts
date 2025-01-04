import { Post } from "@/types/PostType";
import { User } from "@/types/UserType";
import { keepPreviousData, useQuery, UseQueryOptions } from "@tanstack/react-query";
import ApiClient from "@/services/api-client";

const apiClient = new ApiClient<Post[]>("/posts");

const usePosts = (user: User | undefined) => {
    const params = user ? { userId: user.id } : {};

    return useQuery<Post[], Error>({
        queryKey: user ? ["users", user.id, "posts"] : ["users", "posts"],
        queryFn: () => apiClient.getAll(params),
        staleTime: 1 * 60 * 1000, // 1 minute
        keepPreviousData: true, // Keep previous data when fetching new data
        placeholderData: keepPreviousData,
    } as UseQueryOptions<Post[], Error>);
};

export default usePosts;
