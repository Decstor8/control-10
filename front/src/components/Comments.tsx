import React from 'react';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deleteComment, getAllComments } from "../store/slice/slice";
import { Button } from '@mui/material';
type CommentsType = { 
    idComment: string;
};
const Comments:React.FC<CommentsType> = ({idComment}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(getAllComments(idComment));
    }, []);
    const onHandleDelete = async(id: string) => {
        await dispatch(deleteComment(id)); 
        await dispatch(getAllComments(idComment));
    };
    const { comments } = useAppSelector((state) => state.slice);
  return (
    <div>
    {comments.map((item, key) => (
      <div style={{margin: '15px', border: '1px solid black', borderRadius: '5px', padding:'10px 5px'}} key={key}>
        <span>Автор: {item.author}: {item.message} </span>
        <Button variant="contained" color="error" onClick={() => onHandleDelete(item.id)}>
          Удалить
        </Button>
      </div>
    ))}
  </div>
  );
};

export default Comments;
