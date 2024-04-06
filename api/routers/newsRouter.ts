import { Request, Response, Router } from 'express';
import { imagesUpload } from '../multer';
const fs = require('fs');
// import { Message } from '../types';
const newsRouter = Router();

newsRouter.post('/',imagesUpload.single('file') ,async (req:Request, res:Response) => {
    const { newsMessage, newsTitle, } = req.body;
    
    if (!newsMessage || !newsTitle ) {
        return res.status(400).send({'error': 'Поля не заполнены'});
    }
    
    const newNews = {
        id: crypto.randomUUID(),
        image: req.file ? req.file.filename : null,
        newsMessage, 
        newsTitle,
        createdAt: new Date().toISOString()
    };
    


    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Ошибка сервера'});
        }

        const db = JSON.parse(data.toString() || '{}');
        db.news = db.news || [];
        db.news.push(newNews);

        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err: Error) => {
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
        let messages = db.news || [];  
        res.json(messages);
    });
});

export default newsRouter;