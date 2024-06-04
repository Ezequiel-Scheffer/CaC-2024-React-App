import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetallePokemon from './pages/DetallePokemon';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<DetallePokemon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
