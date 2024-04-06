import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deleteNews, getAllNews } from "../store/slice/slice";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Grid} from "@mui/material";
import dayjs from "dayjs";

function NewsPage () {
    const dispatch = useAppDispatch();
    useEffect(() =>{ 
        dispatch(getAllNews());
    },[]);
    const {news} = useAppSelector((state) => state.slice);
    const onHanldeDelete = async(id: string) => {
        await dispatch(deleteNews(id));
        dispatch(getAllNews());
    };
    return ( 
        <>
        <Button variant="contained" color="primary" component={Link} to={'/create/'} style={{margin: '10px'}}>Добавить новость</Button>

        <Grid container spacing={2}>
    {news?.map((i, key) => (
      <Grid item key={key}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={i.image ? `http://localhost:8000/${i.image}` : 'https://static.thenounproject.com/png/504708-200.png'}
            alt='Изображения новостей для новости'
          />
          <CardContent>
            <h2>{i.newsTitle}</h2>
            <p>{dayjs(i.createdAt).format('DD MMM YYYY, HH:mm')}</p>
            <Button variant="contained" color="primary" component={Link} to={`/news/${i.id}`} style={{ marginRight: '10px' }}>
              Подробнее
            </Button>
            <Button variant="contained" color="error" onClick={() => onHanldeDelete(i.id)}>
              Удалить
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
      </>
    );
};

export default NewsPage;