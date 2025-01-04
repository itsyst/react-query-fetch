import { User } from "@/types/UserType";
import ApiClient from "./api-client";

export default new ApiClient<User[]>("/users");