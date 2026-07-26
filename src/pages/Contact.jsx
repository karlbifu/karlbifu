import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Button from '../components/common/Button';

const Contact = () => {

  const [state, handleSubmit] = useForm("mnnkgdnr");

  if (state.succeeded) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-[#0B0F14]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center max-w-md"
        >
          <div className="w-16 h-16 bg-[#3FA9A0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPaperPlane className="text-[#3FA9A0] text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Message envoyé !</h2>
          <p className="text-slate-400 mb-6">
            Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.
          </p>
          <Button to="/" variant="primary">Retour à l'accueil</Button>
        </motion.div>
      </div>
    );
  }

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
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3FA9A0]/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

        {/* Gauche : Coordonnées */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Construisons Quelque Chose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C98A4B] to-[#3FA9A0]">
              d'Extraordinaire
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-12">
            Que vous ayez une question, un projet à discuter, ou simplement envie d'échanger sur les
            systèmes, la data ou la cybersécurité, ma boîte mail est toujours ouverte.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#3FA9A0]/10 rounded-lg text-[#3FA9A0]">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h3 className="text-slate-200 font-semibold text-lg">Email</h3>
                <a href="mailto:karlbifu.bifu9@gmail.com" className="text-slate-400 hover:text-[#3FA9A0] transition-colors">
                  karlbifu.bifu9@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C98A4B]/10 rounded-lg text-[#C98A4B]">
                <FaLinkedin size={24} />
              </div>
              <div>
                <h3 className="text-slate-200 font-semibold text-lg">LinkedIn</h3>
                <a href="https://linkedin.com/in/karl-bifu-282b61165" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#C98A4B] transition-colors">
                  Me suivre sur LinkedIn
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-800 rounded-lg text-white">
                <FaGithub size={24} />
              </div>
              <div>
                <h3 className="text-slate-200 font-semibold text-lg">GitHub</h3>
                <a href="https://github.com/kbbifu" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  Voir mes dépôts
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#3FA9A0]/10 rounded-lg text-[#3FA9A0]">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h3 className="text-slate-200 font-semibold text-lg">Kinshasa, République Démocratique du Congo</h3>
                <p className="text-slate-400">
                  Disponible pour du travail à distance
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Droite : Formulaire de contact */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-[#3FA9A0] focus:ring-1 focus:ring-[#3FA9A0] transition-all"
                  placeholder="Jean Dupont"
                />
                <ValidationError prefix="Nom" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-[#3FA9A0] focus:ring-1 focus:ring-[#3FA9A0] transition-all"
                  placeholder="votre@email.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">Objet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-[#3FA9A0] focus:ring-1 focus:ring-[#3FA9A0] transition-all"
                placeholder="Discussion de projet"
              />
              <ValidationError prefix="Objet" field="subject" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-[#3FA9A0] focus:ring-1 focus:ring-[#3FA9A0] transition-all resize-none"
                placeholder="Parlez-moi de votre projet..."
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center bg-[#C98A4B] hover:bg-[#B87A3E] text-slate-950 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={state.submitting}
            >
              {state.submitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </Button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;