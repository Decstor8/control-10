import { commentsParams, commentsTypeParams} from "../types";
import { instance } from "./instantce";

export const commentsApi = {
    getAllComments: (params:commentsParams) => {
        return instance.get('comments',{params});
    },
    deleteComment : (id: string) => {
        return instance.delete(`comments/${id}`);
    },
    createComments : (data: commentsTypeParams) => {
        return instance.post(`comments/`, data);
    },
};