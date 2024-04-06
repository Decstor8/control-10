import React, { useState } from 'react';
import { useAppDispatch } from "../store/store";
import { createComment, getAllComments } from "../store/slice/slice";
type CommentsType = { 
    idComment: string;
};

const AddComments:React.FC<CommentsType> = ({idComment}) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const onHanldeSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(createComment({author: name, message, newsId: idComment}));
        dispatch(getAllComments(idComment));
        setName('');
        setMessage('');
    };
  return (
    <form onSubmit={onHanldeSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
      <button>Sabmut</button>
    </form>
  );
};

export default AddComments;
