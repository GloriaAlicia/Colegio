import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPhone,
  faLocationDot,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full bg-[#00a8ff] py-8 text-white sm:px-40">
        <div className="m-auto flex w-4/5 flex-wrap justify-between gap-8 sm:max-w-[75rem]">
          <div className="grid grid-cols-3 gap-4 text-xs font-semibold sm:w-[25rem] sm:gap-[0.7rem]">
            <span className="text-sm font-bold">Nosotros</span>
            <span className="text-sm font-bold">Colegio</span>
            <span className="text-sm font-bold">Talleres</span>
            <span>Quienes somos?</span>
            <span>Admision</span>
            <span>Cursos de Arte</span>
            <span>Mision</span>
            <span>Por que elegirnos?</span>
            <span>Deporte</span>
            <span>Vision</span>
            <span>Niveles</span>
            <span>Karate</span>
            <span className="col-span-2">Objetivos</span>
            <span>Blog</span>
          </div>
          <div className="flex flex-col gap-[0.7rem] text-xs font-semibold">
            <span className="text-sm font-bold">Ponerse en Contacto</span>
            <div className="space-x-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>(480) 555-0103</span>
            </div>
            <div className="space-x-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>La Molina - Av. La Fontana </span>
            </div>
            <div className="space-x-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>jesusnazareno@outlook.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto flex w-full max-w-[75rem] flex-col justify-between px-8 py-3 sm:flex-row md:px-40">
        <span className="text-center text-sm font-medium text-zinc-600 sm:text-base">
          Jesus de Nazareno - Todos los derechos reservados
        </span>
        <div className="flex justify-center gap-4 py-3 font-medium text-zinc-600">
          <FontAwesomeIcon className="text-xl" icon={faFacebook} />
          <FontAwesomeIcon className="text-xl" icon={faInstagram} />
          <FontAwesomeIcon className="text-xl" icon={faTwitter} />
        </div>
      </div>
    </footer>
  );
}
