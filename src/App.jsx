import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import NotFound from './pages/NotFound';
import usePageTitle from './hooks/usePageTitle';

function App() {
  usePageTitle();

  // NB : l'ancienne redirection vers un domaine tiers (template d'origine) a été retirée.
  // Si ce portfolio est déployé sur un domaine personnalisé, ajoutez ici la redirection
  // depuis le sous-domaine ".pages.dev" vers votre propre nom de domaine.

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Zone de contenu principal - flex-grow garde le footer en bas de page */}
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
