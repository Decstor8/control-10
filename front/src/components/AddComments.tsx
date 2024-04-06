import React, { useState } from 'react';
import { useAppDispatch } from "../store/store";
import { createComment, getAllComments } from "../store/slice/slice";
import { Button, TextField } from '@mui/material';
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
    <form onSubmit={onHanldeSubmit} style={{marginTop: '20px', borderTop: '2px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color='secondary'>Отправить</Button>
    </form>
  );
};

export default AddComments;
