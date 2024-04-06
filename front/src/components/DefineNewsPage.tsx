import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getDefineNews } from "../store/slice/slice";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import AddComments from "./AddComments";
import { Card, CardContent, CardMedia } from "@mui/material";

function DefineNewsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDefineNews(id || ""));
  }, []);
  const { defineNews } = useAppSelector((state) => state.slice);
  return (
    <>
     <Card>
     <CardContent>
          <h1>{defineNews?.newsTitle}</h1>
          <h3>{defineNews?.createdAt}</h3>
          <p>{defineNews?.newsMessage}</p>
        </CardContent>
        {defineNews?.image && (
          <CardMedia
          component="img"
          height="140"
          image={defineNews?.image ? `http://localhost:8000/${defineNews.image}` : 'https://static.thenounproject.com/png/504708-200.png'}
          alt="Новостное изображение"
        />
        )}
      <Comments idComment={id || ''}/>
      <AddComments idComment={id || ''} />
      </Card>
    </>
  );
};

export default DefineNewsPage;
