import React from 'react';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deleteComment, getAllComments } from "../store/slice/slice";
type CommentsType = { 
    idComment: string;
};
const Comments:React.FC<CommentsType> = ({idComment}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(getAllComments(idComment));
    }, []);
    const onHanldeDelete = async(id: string) => {
        await dispatch(deleteComment(id)); 
        await dispatch(getAllComments(idComment));
    };
    const { comments } = useAppSelector((state) => state.slice);
  return (
    <div>
      { comments.map((item, key) => <div key={key}>{item.author} {item.message} <button onClick={() => onHanldeDelete(item.id)}>Delete</button></div>)}
    </div>
  );
};

export default Comments;
