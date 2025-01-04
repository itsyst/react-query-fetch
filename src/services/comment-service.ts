import { Comment } from "@/types/CommentType";
import ApiClient from "./api-client";
 
export default new ApiClient<Comment[]>("/comments");



 