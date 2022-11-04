import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChevronDown,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-[#00a8ff] text-white">
      <div className=" m-auto flex w-full flex-col justify-between p-5 sm:max-w-[75rem] sm:flex-row sm:px-40 sm:py-5">
        <Link to="/" className="space-x-2">
          <FontAwesomeIcon icon={faSchool} />
          <span className="font-medium uppercase">Jesus de Nazareno</span>
        </Link>

        <div className="space-x-2">
          <FontAwesomeIcon icon={faUser} />
          <span>Admin</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </header>
  );
}
