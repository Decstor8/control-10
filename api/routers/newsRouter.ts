import { Request, Response, Router } from 'express';
import { imagesUpload } from '../multer';
const fs = require('fs');
import { newsComments, newsType } from '../types';
const newsRouter = Router();

newsRouter.post('/',imagesUpload.single('file') ,async (req:Request, res:Response) => {
    const { newsMessage, newsTitle, } = req.body;
    
    if (!newsMessage || !newsTitle ) {
        return res.status(400).send({'error': 'Поля не заполнены'});
    };
    
    const newNews: newsType = {
        id: crypto.randomUUID(),
        image: req.file ? req.file.filename : null,
        newsMessage, 
        newsTitle,
        createdAt: new Date().toISOString()
    };

    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Ошибка сервера'});
        };

        const db = JSON.parse(data.toString() || '{}');
        db.news = db.news || [];
        db.news.push(newNews);

        fs.writeFile('db.json', JSON.stringify(db, null, 2), () => {
            res.status(200).json(newNews);
        });
    });
});

newsRouter.get('/', (_, res: Response) => {
    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        };

        const db = JSON.parse(data.toString());
        let news = db.news || [];  
        const newsWithoutMessage = news.map((item: newsType) => {
            return {  
                newsTitle: item.newsTitle,
                image: item.image,
                id: item.id,
                createdAt: item.createdAt
            };
        });
        res.json(newsWithoutMessage);
    });
});
newsRouter.get('/:id', (req, res: Response) => {
    const id = req.params.id;
    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        };

        const db = JSON.parse(data.toString());
        let news = db.news || [];  
        const defainNews = news.find((item: newsType) => item.id === id);
        if (!defainNews) {
            return res.status(404).json({error: 'Новость не найдена'});
        };
        res.json(defainNews);
    });
});
newsRouter.delete('/:id', (req, res: Response) => {
    const id = req.params.id;
    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        };

        const db = JSON.parse(data.toString());
        const news = db.news || [];  
        const newNews = news.filter((item : newsType) => item.id !== id);
        db.news = newNews;

        const comments = db.comments || [];  
        db.comments = comments.filter((item: newsComments) => item.newsId !== id);

        fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', () => {
            res.status(200).json({ message: 'Новость и связанные с ней комментарии удалены' });
        });
    });
});

export default newsRouter;