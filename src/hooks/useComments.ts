import axios from "axios";
import { InfiniteData, QueryFunction, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { Comment } from "@/types/CommentType";

interface CommentQuery {
    pageSize: number;
}

const useComments = (query: CommentQuery) => {
    const fetchComments: QueryFunction<Comment[], QueryKey, number> = async ({ pageParam = 1 }) => await axios
        .get<Comment[]>(`https://jsonplaceholder.typicode.com/comments`, {
            params: {
                _start: (pageParam - 1) * query.pageSize,
                _limit: query.pageSize,
            },
        })
        .then((res) => res.data);


    return useInfiniteQuery<Comment[], Error, InfiniteData<Comment[], unknown>, QueryKey, number>({
        queryKey: ['comments', query],
        queryFn: fetchComments,
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

export default useComments;
