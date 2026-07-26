import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Colonne Marque */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-slate-100 font-mono">
              KB BIFU<span className="text-[#3FA9A0]">.dev</span>
            </Link>
            <p className="mt-4 text-slate-400 max-w-xs">
              Ingénieur informaticien concevant des systèmes fiables, entre data science,
              intelligence artificielle et cybersécurité.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-[#3FA9A0] transition-colors">À propos</Link></li>
              <li><Link to="/projects" className="text-slate-400 hover:text-[#3FA9A0] transition-colors">Projets</Link></li>
              <li><Link to="/skills" className="text-slate-400 hover:text-[#3FA9A0] transition-colors">Compétences</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-[#3FA9A0] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Réseaux */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-4">Me suivre</h3>
            <div className="flex gap-4">
              <a href="https://github.com/kbbifu" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-xl" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/karl-bifu-282b61165" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#3FA9A0] transition-colors text-xl" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bandeau du bas */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Karl Batunguni Bifu. Tous droits réservés.
          </p>
          <p className="text-slate-600 text-sm flex items-center gap-1">
            Conçu avec <FaHeart className="text-[#C98A4B]/70" /> par Karl Batunguni Bifu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;