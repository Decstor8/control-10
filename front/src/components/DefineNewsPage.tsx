import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getDefineNews } from "../store/slice/slice";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import AddComments from "./AddComments";

function DefineNewsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDefineNews(id || ""));
  }, []);
  const { defineNews } = useAppSelector((state) => state.slice);
  return (
    <>
      <h1>{defineNews?.newsTitle}</h1>
      <h3>{defineNews?.createdAt}</h3>
      <h3>{defineNews?.newsMessage}</h3>
      <img src={defineNews?.image ? `http://localhost:8000/${defineNews.image}` : 'https://static.thenounproject.com/png/504708-200.png'} alt="" /> 
      <Comments idComment={id || ''}/>
      <AddComments idComment={id || ''} />
    </>
  );
};

export default DefineNewsPage;
