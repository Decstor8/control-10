import newsRouter from "./routers/newsRouter";

const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());
app.use('/news', newsRouter);
app.use(express.static('public/images'));

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});