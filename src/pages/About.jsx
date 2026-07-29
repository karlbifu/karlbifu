import { motion } from 'framer-motion';
import { FaGraduationCap, FaServer, FaBrain, FaShieldAlt, FaFileDownload } from 'react-icons/fa';
import Button from '../components/common/Button';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

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

      {/* Halos de couleur */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#3FA9A0]/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#C98A4B]/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Gauche : Photo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative lg:sticky lg:top-24"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-sm aspect-[4/5] shadow-2xl">
            <img
              src={`${import.meta.env.BASE_URL}photo1.jpg`}
              alt="Karl Batunguni Bifu"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
              <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-lg">
                <p className="text-slate-400 text-xs font-mono mb-1">ACTUELLEMENT</p>
                <p className="text-[#3FA9A0] font-semibold flex items-center gap-2 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FA9A0] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3FA9A0]"></span>
                  </span>
                  Ouvert à des missions de Data Scientist, Analyste de Données ou Architecte des Systèmes Informatiques
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 w-full h-full border border-slate-800/50 rounded-2xl -z-10 bg-slate-900/30 backdrop-blur-sm" />
        </motion.div>

        {/* Droite : Contenu */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* En-tête */}
          <motion.div variants={itemVariants}>
            <h2 className="text-[#3FA9A0] font-mono text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#3FA9A0]"></span>
              Qui suis-je ?
            </h2>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6 leading-tight">
              Concevoir des systèmes, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C98A4B] to-[#3FA9A0]">comprendre les données</span>
            </h1>
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>
                Je suis <strong className="text-slate-200">Ingénieur Informaticien</strong>, diplômé en Mathématique-Informatique de l'Université Pédagogique Nationale (UPN) à Kinshasa, avec plus de 7 ans d'expérience dans la conception et l'administration de systèmes informatiques, le développement logiciel et la data science. Mon travail ne se limite pas à écrire du code : je construis des systèmes conçus pour tenir la charge, en production, sur la durée.
              </p>
              <p>
                Je conjugue une double compétence rare : l'<strong className="text-slate-200">administration de systèmes et réseaux</strong> (Windows Server, Active Directory, Cisco, Juniper, Nokia) et la <strong className="text-slate-200">data science &amp; l'intelligence artificielle</strong> (Python, TensorFlow, PyTorch, agents IA). La <strong className="text-slate-200">cybersécurité</strong> et l'architecture backend en microservices complètent ce socle — toujours avec la fiabilité comme objectif.
              </p>
            </div>
          </motion.div>

          {/* Formation & Compétences clés */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-[#C98A4B]/40 transition-colors group">
              <FaGraduationCap className="text-3xl text-[#C98A4B] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-slate-200 font-bold mb-1">Licence Mathématique-Informatique</h3>
              <p className="text-sm text-slate-500">Conception des Systèmes d'Information — UPN Kinshasa</p>
              <p className="text-xs text-slate-600 mt-2 font-mono">2013 - 2016</p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-[#3FA9A0]/40 transition-colors group">
              <FaServer className="text-3xl text-[#3FA9A0] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-slate-200 font-bold mb-1">Systèmes &amp; Réseaux</h3>
              <p className="text-sm text-slate-500">Windows Server, Active Directory, Cisco, Juniper</p>
              <p className="text-xs text-slate-600 mt-2 font-mono">Administration & infrastructure</p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-purple-500/30 transition-colors group">
              <FaBrain className="text-3xl text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-slate-200 font-bold mb-1">Data Science &amp; IA</h3>
              <p className="text-sm text-slate-500">Machine Learning, Deep Learning, agents IA</p>
              <p className="text-xs text-slate-600 mt-2 font-mono">Python, TensorFlow, PyTorch</p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-orange-500/30 transition-colors group">
              <FaShieldAlt className="text-3xl text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-slate-200 font-bold mb-1">Cybersécurité &amp; Backend</h3>
              <p className="text-sm text-slate-500">API REST, microservices, Fortinet</p>
              <p className="text-xs text-slate-600 mt-2 font-mono">Sécurité &amp; architecture</p>
            </div>
          </motion.div>

          {/* Ce que j'apporte */}
          <motion.div variants={itemVariants} className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C98A4B] to-[#3FA9A0] rounded-l-xl" />
            <h3 className="text-xl font-bold text-slate-200 mb-3">Ce que j'apporte</h3>
            <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <span className="text-[#3FA9A0] mt-1">▹</span>
                <span>Une compréhension complète du cycle de vie des projets IT, de l'audit à la mise en production.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3FA9A0] mt-1">▹</span>
                <span>De l'expérience dans le pilotage de projets avec les méthodes <strong>Agile / Scrum</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3FA9A0] mt-1">▹</span>
                <span>Une double lecture des systèmes : celle de l'ingénieur réseau et celle du data scientist.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3FA9A0] mt-1">▹</span>
                <span>Le goût de la transmission : formateur en IA, data science et réseaux depuis 2012.</span>
              </li>
            </ul>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <Button to="/contact" variant="primary" className="shadow-lg shadow-[#3FA9A0]/20">
              Discutons
            </Button>

            <Button
              href="/resume.pdf"
              variant="outline"
              download="CV_Karl_Batunguni_Bifu.pdf"
              className="gap-2 group"
            >
              <FaFileDownload className="group-hover:translate-y-0.5 transition-transform" />
              Télécharger mon CV
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default About;