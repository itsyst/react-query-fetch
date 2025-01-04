import commentService from "@/services/comment-service";
import { Comment } from "@/types/CommentType";
import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
 
interface CommentQuery {
    pageSize: number;
}

const useComments = (query: CommentQuery) => {
    const pageParam = 1;
    const params = {
        _start: (pageParam - 1) * query.pageSize,
        _limit: query.pageSize,
    };
 
    return useInfiniteQuery<Comment[], Error, InfiniteData<Comment[], unknown>, QueryKey, number>({
        queryKey: ['comments', query],
        queryFn: () => commentService.getAll(params),
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export default useComments;
