import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import HomePage from './homepage';
import DragDropPage from './draganddroppg';
import BlogPage from './blogpage';
import InfoPage from './info';
import BlogPost from './blogpost';
import Visuals from './visuals';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drag-drop" element={<DragDropPage />} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/info" element={<InfoPage/>} />
          <Route path='/visuals' element={<Visuals/>}/>
          <Route path="/:id" element={<BlogPost/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
