import { ApiResponseItem } from "./ApiResponseItem";

export interface ApiResponse {
    Search?: ApiResponseItem[],
    totalResults?: string,
    Response: string,
    Error?: string,
}