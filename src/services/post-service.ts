import { Post } from "@/types/PostType";
import ApiClient from "./api-client";

export default new ApiClient<Post[]>("/posts");



