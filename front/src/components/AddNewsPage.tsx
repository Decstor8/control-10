import React from 'react';
import { useAppDispatch } from '../store/store';
import { createNews } from '../store/slice/slice';
import { Button, TextField } from '@mui/material';

const AddNewsPage = () => {
    const dispatch = useAppDispatch();
    const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        dispatch(createNews(formData));
      };

  return (
    <form onSubmit={onHandleSubmit}>
         <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="newsTitle"
        label="Заголовок новости"
        type="text"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="newsMessage"
        label="Текст новости"
        rows={4}
      />
      <input
        type="file"
        name="file"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Отправить
      </Button>
    </form>
  )
};

export default AddNewsPage;
