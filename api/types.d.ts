export interface newsType {
    newsTitle: string,
    newsMessage: string,
    image: string | null,
    id: string,
    createdAt: string,
}

export interface newsComments {
    id: string,
    newsId: string,
    author: string | undefined,
    message: string,
}