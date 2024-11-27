import { FiGitCommit } from "react-icons/fi";
import { HiDatabase } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";

export const FEATURES = [
  {
    id: 2,
    title: "Control Dinámico de Repositorios",
    description:
      "Vincula pestillos de seguridad dinámicos a cada repositorio para gestionar accesos y acciones críticas con precisión.",
    icon: <HiDatabase />,
  },
  {
    id: 3,
    title: "Gestión Centralizada",
    description:
      "Administra fácilmente todos tus repositorios y sus integraciones desde una plataforma intuitiva y poderosa.",
    icon: <MdDashboardCustomize />,
  },
  {
    id: 4,
    title: "Integración Sencilla",
    description:
      "Instala y configura Quantum en minutos gracias a flujos automatizados y soporte multiplataforma.",
    icon: <FiGitCommit />,
  },
  {
    id: 5,
    title: "Alertas y Monitoreo en Tiempo Real",
    description:
      "Recibe notificaciones instantáneas sobre intentos de acceso no autorizados o acciones bloqueadas en tus repositorios.",
    icon: <IoNotificationsOutline />,
  },

];
