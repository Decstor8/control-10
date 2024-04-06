import './App.css';
import { Routes, Route } from 'react-router-dom';
import NewsPage from './components/NewsPage';
import DefineNewsPage from './components/DefineNewsPage';

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<NewsPage/>}/>
        <Route path='/news/:id' element={<DefineNewsPage/>}/>
      </Routes>
    </>
  );
};

export default App;
