export interface newsType {
    newsTitle: string,
    newsMessage: string,
    image: string | null,
    id: string,
    createdAt: string,
}
export interface commentsTypeParams {
    newsId: string,
    author: string | undefined,
    message: string
}

export interface newsComments {
    id: string,
    newsId: string,
    author: string | undefined,
    message: string,
} 
export interface newsNewsParams {
    newsTitle: string,
    newsMessage: string,
    image: File | null,
} 
export interface commentsParams { 
    news_id:string
}