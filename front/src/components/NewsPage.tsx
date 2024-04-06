import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deleteNews, getAllNews } from "../store/slice/slice";
import { Link } from "react-router-dom";

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
            { 
                news?.map((i,key) => <div key={key}>
                    <img src={i.image ? `http://localhost:8000/${i.image}` : 'https://static.thenounproject.com/png/504708-200.png'} alt="" />
                    <h1>{i.newsTitle}</h1>
                    <h1>{i.createdAt}</h1> 
                    <Link to={`/news/${i.id}`}>Read All</Link>
                    <button onClick={() => onHanldeDelete(i.id)}>Delete</button>

                </div>)
            }
        </>
    );
};

export default NewsPage;