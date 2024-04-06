import React from 'react';
import { useAppDispatch } from '../store/store';
import { createNews } from '../store/slice/slice';

const AddNewsPage = () => {
    const dispatch = useAppDispatch();
    const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        dispatch(createNews(formData));
      };

  return (
    <form onSubmit={onHandleSubmit}>
      <input name='newsTitle' required></input>
      <textarea name='newsMessage' required></textarea>
      <input name='file' type='file'></input>
      <button>Submit</button>
    </form>
  )
};

export default AddNewsPage;
