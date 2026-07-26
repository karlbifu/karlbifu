import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import ProjectCard from '../components/project/ProjectCard';

const Projects = () => {
  const [filter, setFilter] = useState('Tous');

  // Extraction des catégories uniques pour les boutons de filtre
  const categories = ['Tous', ...new Set(projectsData.map(item => item.category))];

  const filteredProjects = filter === 'Tous'
    ? projectsData
    : projectsData.filter(project => project.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0B0F14]">

      {/* Trame "plan technique" en arrière-plan */}
      <div
        className="absolute inset-0 -z-20 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1F2A35 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambiance de fond */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C98A4B]/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">

        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C98A4B] to-[#3FA9A0]">Phares</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Une sélection de mes réalisations, entre applications web complexes, projets de data science
            et conceptions d'architectures backend.
          </p>
        </div>

        {/* Boutons de filtre */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-[#C98A4B] text-slate-950 shadow-lg shadow-[#C98A4B]/25 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Message si aucun résultat */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 mt-12"
          >
            Aucun projet trouvé dans cette catégorie.
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Projects;
