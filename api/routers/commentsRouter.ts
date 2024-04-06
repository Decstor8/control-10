import { Request, Response, Router } from 'express';
const fs = require('fs');
import { newsComments } from '../types';
const commentsRouter = Router();

commentsRouter.post('/' ,async (req:Request, res:Response) => {
    const { author, message, newsId} = req.body;
    
    if (!message || !newsId) {
        return res.status(400).send({'error': 'Поля не заполнены'});
    };
    
    const newComment: newsComments = {
        id: crypto.randomUUID(),
        author: author || 'Anonumys',
        message,
        newsId,
    };

    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Ошибка сервера'});
        };

        const db = JSON.parse(data.toString() || '{}');
        db.comments = db.comments || [];
        db.comments.push(newComment);

        fs.writeFile('db.json', JSON.stringify(db, null, 2), () => {
            res.status(200).json(newComment);
        });
    });
});

commentsRouter.get('/', (req: Request, res: Response) => {
    const queryNewsId = req.query.news_id
    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        };

        const db = JSON.parse(data.toString());
        const comments = db.comments || []; 
        if (!queryNewsId) {
            return res.status(400).json({error: 'Не найден ID'})
        };
        const filteredComments = comments.filter((item: newsComments) => item.newsId === queryNewsId);
        res.json(filteredComments);
    });
});

commentsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        };

        const db = JSON.parse(data.toString());

        const comments = db.comments || [];  

        db.comments = comments.filter((item: newsComments) => item.id !== id);
        fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', () => {
            res.status(200).json({ message: 'Коментарий удален' });
        });
    });
});

export default commentsRouter;