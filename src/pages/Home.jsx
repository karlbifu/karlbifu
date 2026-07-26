import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { FaGithub, FaLinkedin, FaNetworkWired } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#0B0F14]">

      {/* Trame "plan technique" en arrière-plan - clin d'oeil aux schémas réseau */}
      <div
        className="absolute inset-0 -z-20 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #1F2A35 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Halos de couleur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C98A4B]/10 rounded-full blur-[110px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3FA9A0]/10 rounded-full blur-[110px] -z-10" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Gauche : Contenu */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3FA9A0]/10 border border-[#3FA9A0]/30 text-[#3FA9A0] text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3FA9A0] animate-pulse"></span>
            Disponible pour une nouvelle mission
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-slate-100 leading-tight tracking-tight mb-6">
            Concevoir des <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C98A4B] to-[#3FA9A0]">
              Systèmes Fiables
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
            Je suis <span className="text-slate-200 font-semibold">Ingénieur Informaticien</span>, spécialisé dans
            l'administration de systèmes et réseaux, la data science &amp; l'IA, ainsi que la cybersécurité.
            Je conçois des architectures backend robustes et je relie l'infrastructure aux données.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button to="/projects" className="bg-[#C98A4B] hover:bg-[#B87A3E] text-slate-950 border-0 font-semibold">
              Voir mes projets
            </Button>
            <Button to="/contact" variant="outline" className="border-slate-700 text-slate-300 hover:border-[#3FA9A0] hover:text-[#3FA9A0] hover:bg-transparent">
              Me contacter
            </Button>
          </div>

          {/* Réseaux sociaux */}
          <div className="mt-10 flex items-center gap-6 text-slate-500">
            <span className="text-sm font-mono uppercase tracking-widest">Retrouvez-moi</span>
            <div className="h-px w-12 bg-slate-800"></div>
            <div className="flex gap-4 text-2xl">
              <a href="https://github.com/kbbifu" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub className="hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com/in/karl-bifu-282b61165" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="hover:text-[#3FA9A0] transition-colors" />
              </a>
              <FaNetworkWired className="hover:text-[#C98A4B] transition-colors" title="Réseaux & Systèmes" />
            </div>
          </div>
        </motion.div>

        {/* Droite : Carte "fiche technique" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 bg-[#121820] border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-auto text-xs text-slate-500 font-mono">ingenieur.config</span>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-[#C98A4B]">const <span className="text-[#3FA9A0]">ingenieur</span> = <span className="text-yellow-300">{'{'}</span></div>
              <div className="pl-4 text-slate-300">nom : <span className="text-green-400">"Karl Batunguni Bifu"</span>,</div>
              <div className="pl-4 text-slate-300">role : <span className="text-green-400">"Ingénieur Informaticien| Data &amp; IA | Cybersécurité"</span>,</div>
              <div className="pl-4 text-slate-300">competences : <span className="text-yellow-300">[</span></div>
              <div className="pl-8 text-green-400">"Réseaux", "Data Science", "Sécurité", "Backend"</div>
              <div className="pl-4 text-yellow-300">],</div>
              <div className="pl-4 text-slate-300">disponible : <span className="text-orange-400">true</span></div>
              <div className="text-yellow-300">{'}'};</div>
            </div>
          </div>

          {/* Éléments décoratifs derrière la carte */}
          <div className="absolute -top-4 -right-4 w-full h-full border-2 border-slate-800 rounded-2xl -z-10" />
          <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-slate-800 rounded-2xl -z-10" />
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
