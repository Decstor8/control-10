import './App.css';
import { Routes, Route } from 'react-router-dom';
import NewsPage from './components/NewsPage';
import DefineNewsPage from './components/DefineNewsPage';
import AddNewsPage from './components/AddNewsPage';

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<NewsPage/>}/>
        <Route path='/news/:id' element={<DefineNewsPage/>}/>
        <Route path='/create/' element={<AddNewsPage />} />
      </Routes>
    </>
  );
};

export default App;
