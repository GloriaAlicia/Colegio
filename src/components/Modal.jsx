import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Modal = ({ children, open, setOpen, cerrar, abrir }) => {
  return (
    <>
      {abrir ? (
        <div
          className="mb-1 flex w-full justify-end "
          onClick={() => setOpen('')}
        >
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="text-2xl text-slate-900"
          />
        </div>
      ) : undefined}

      <article
        className={`fixed inset-0 flex items-center justify-center bg-slate-900/70 transition-all ${open}`}
      >
        <div className="fixed flex w-11/12 items-center justify-center rounded-md bg-white p-4 sm:w-5/6 lg:w-3/4">
          <div className="flex w-full flex-col items-center self-center">
            <div className="relative flex w-full justify-between">
              <button
                onClick={() => setOpen('hidden')}
                className="absolute right-0 top-0"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-2xl text-slate-900"
                  onClick={cerrar}
                />
              </button>
            </div>
            <div className="w-full">{children}</div>
          </div>
        </div>
      </article>
    </>
  );
};
