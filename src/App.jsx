import React, {useState} from 'react'
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Contact from './pages/Contact';
import Greeting from "./components/Greeting"


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'recipe':
        return <Recipe />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };



  return (
    <div>
      <nav>
      <Greeting />
      <div className="nav-links">
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('recipe')}>Recipe</button>
        <button onClick={() => setCurrentPage('contact')}>Contact</button>
      </div>
      </nav>
      {renderPage()}
    </div>
  )
}

export default App
