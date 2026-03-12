import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import CompareTray from './components/CompareTray.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import CarDetailPage from './pages/CarDetailPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import MyGaragePage from './pages/MyGaragePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/garage" element={<MyGaragePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <CompareTray />
    </div>
  );
}
