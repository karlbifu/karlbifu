import {
  FaServer, FaBrain, FaShieldAlt, FaCode, FaNetworkWired,
  FaWindows, FaProjectDiagram, FaDatabase, FaPython, FaDocker,
  FaGitAlt, FaJava, FaNodeJs, FaCloud, FaLock, FaRobot,
  FaChartBar, FaCogs
} from 'react-icons/fa';

export const skillsData = [
  {
    id: 1,
    category: "Administration & Conception des Systèmes",
    description: "Infrastructures serveurs, virtualisation et conception de systèmes d'information",
    icon: <FaServer />,
    skills: [
      { name: "Windows Server & Active Directory", icon: <FaWindows />, level: "Avancé" },
      { name: "VMware ESXi / vSphere / Hyper-V", icon: <FaServer />, level: "Avancé" },
      { name: "UML & MERISE", icon: <FaProjectDiagram />, level: "Avancé" },
      { name: "Bases de données (SQL Server, PostgreSQL)", icon: <FaDatabase />, level: "Avancé" },
      { name: "Gestion de projets (Agile/Scrum, Jira)", icon: <FaCogs />, level: "Avancé" },
    ],
  },
  {
    id: 2,
    category: "Data Science, IA & Big Data",
    description: "Modélisation statistique, machine learning et traitement de données à grande échelle",
    icon: <FaBrain />,
    skills: [
      { name: "Python (Scikit-learn, XGBoost)", icon: <FaPython />, level: "Avancé" },
      { name: "TensorFlow & PyTorch", icon: <FaBrain />, level: "Avancé" },
      { name: "Agents IA & serveurs MCP", icon: <FaRobot />, level: "Avancé" },
      { name: "Big Data (Hadoop, Spark, Kafka)", icon: <FaChartBar />, level: "Intermédiaire" },
      { name: "Déploiement cloud (AWS)", icon: <FaCloud />, level: "Intermédiaire" },
    ],
  },
  {
    id: 3,
    category: "Cybersécurité",
    description: "Sécurité périmétrique, gestion des accès et continuité de service",
    icon: <FaShieldAlt />,
    skills: [
      { name: "Fortinet (FCF, FCA)", icon: <FaShieldAlt />, level: "Avancé" },
      { name: "Sophos EPP / Qualys", icon: <FaLock />, level: "Intermédiaire" },
      { name: "Sensibilisation OWASP", icon: <FaShieldAlt />, level: "Intermédiaire" },
      { name: "Gestion des identités & des accès", icon: <FaLock />, level: "Avancé" },
    ],
  },
  {
    id: 4,
    category: "Développement Backend & Microservices",
    description: "API, architectures distribuées et outils DevOps",
    icon: <FaCode />,
    skills: [
      { name: "API REST, GraphQL, gRPC", icon: <FaCode />, level: "Avancé" },
      { name: "PHP (Laravel), Java (J2EE/Spring)", icon: <FaJava />, level: "Avancé" },
      { name: "Node.js & architectures microservices", icon: <FaNodeJs />, level: "Avancé" },
      { name: "Docker & Kubernetes", icon: <FaDocker />, level: "Intermédiaire" },
      { name: "Git & CI/CD", icon: <FaGitAlt />, level: "Avancé" },
    ],
  },
  {
    id: 5,
    category: "Réseaux & Télécoms",
    description: "Conception, déploiement et sécurisation d'infrastructures réseau",
    icon: <FaNetworkWired />,
    skills: [
      { name: "Cisco, Juniper, Nokia, Mikrotik", icon: <FaNetworkWired />, level: "Avancé" },
      { name: "LAN / WAN, DWDM", icon: <FaNetworkWired />, level: "Avancé" },
      { name: "VPN & pare-feu", icon: <FaShieldAlt />, level: "Intermédiaire" },
      { name: "Routage & QoS", icon: <FaNetworkWired />, level: "Intermédiaire" },
    ],
  },
];
