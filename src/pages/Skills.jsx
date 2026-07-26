import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

const levelStyles = {
  'Avancé': 'bg-[#C98A4B]/10 text-[#C98A4B] border border-[#C98A4B]/30',
  'Intermédiaire': 'bg-[#3FA9A0]/10 text-[#3FA9A0] border border-[#3FA9A0]/30',
};
const defaultLevelStyle = 'bg-slate-700/30 text-slate-400 border border-slate-700';

const Skills = () => {
  // Variantes d'animation pour l'effet cascade des cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0B0F14]">

      {/* Trame "plan technique" en arrière-plan */}
      <div
        className="absolute inset-0 -z-20 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1F2A35 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Halos de couleur */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#3FA9A0]/10 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#C98A4B]/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* En-tête de page */}
        <div className="text-center mb-16">
          <h2 className="text-[#3FA9A0] font-mono text-sm tracking-widest uppercase mb-3">
            Capacités système
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100">
            Arsenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C98A4B] to-[#3FA9A0]">Technique</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Un panorama de mes compétences, de l'administration de systèmes et réseaux à la data science,
            en passant par la cybersécurité et le développement backend.
          </p>
        </div>

        {/* Grille des compétences */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillsData.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-[#3FA9A0]/50 transition-colors duration-300"
            >
              {/* En-tête de carte */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-slate-800 text-[#3FA9A0] group-hover:bg-[#3FA9A0]/10 group-hover:text-[#3FA9A0] transition-colors">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      {category.category}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Liste des compétences */}
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {skill.icon}
                      </span>
                      <span className="text-slate-300 font-medium text-sm">
                        {skill.name}
                      </span>
                    </div>
                    {/* Badge de niveau */}
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono px-2 py-1 rounded-full ${levelStyles[skill.level] || defaultLevelStyle}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coin décoratif */}
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-[#3FA9A0] shadow-[0_0_10px_rgba(63,169,160,0.6)]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
