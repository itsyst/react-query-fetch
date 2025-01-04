import ApiClient from "@/services/api-client";
import { Comment } from "@/types/CommentType";
import { InfiniteData, QueryFunction, QueryKey, useInfiniteQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<Comment[]>("/comments");
interface CommentQuery {
    pageSize: number;
}

const useComments = (query: CommentQuery) => {
    const fetchComments: QueryFunction<Comment[], QueryKey, number> = async ({ pageParam = 1 }) => {
        const params = {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
        };

        return apiClient.getAll(params);
    };

    return useInfiniteQuery<Comment[], Error, InfiniteData<Comment[], unknown>, QueryKey, number>({
        queryKey: ['comments', query],
        queryFn: fetchComments,
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export default useComments;
