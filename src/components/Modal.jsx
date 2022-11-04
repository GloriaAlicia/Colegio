import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const Modal = ({ children }) => {
  const [open, setOpen] = useState('hidden');

  return (
    <>
      {/* sección para abrir modal */}
      <div
        className="mb-1 flex w-full justify-end "
        onClick={() => setOpen('')}
      >
        <FontAwesomeIcon
          icon={faSquarePlus}
          className="text-2xl text-slate-900"
        />
      </div>

      <article
        className={`fixed inset-0 flex items-center justify-center bg-slate-900/70 transition-all ${open}`}
      >
        <div className="fixed flex w-full  items-center justify-center rounded-md bg-white p-4 sm:w-5/6 md:w-3/4">
          <div className="flex w-full flex-col items-center self-center">
            <div className="relative flex w-full justify-between">
              <button
                onClick={() => setOpen('hidden')}
                className="absolute right-0 top-0"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-2xl text-slate-900"
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
