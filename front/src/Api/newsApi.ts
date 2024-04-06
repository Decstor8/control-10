import { instance } from "./instantce";

export const newsApi = {
    getAllNews: () => {
        return instance.get('news');
    },
    getDefineNews: (id: string) => {
        return instance.get(`news/${id}`);
    },
    deleteNews : (id: string) => {
        return instance.delete(`news/${id}`);
    },
    createNews : (data: FormData) => {
        return instance.post(`news/`, data);
    },
};