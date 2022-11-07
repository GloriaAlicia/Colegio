import {
  faClipboardUser,
  faGraduationCap,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
  faUsersLine,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';
import colegioApi from '../../api/colegioApi';
import { Modal } from '../../components/Modal';
import Table from '../../components/Table';

export default function Alumno() {
  const [data, setdata] = useState([]);
  const [searchValue, setsearchValue] = useState('');

  const [alumno, setAlumno] = useState({});
  const [openInforme, setOpenInforme] = useState('hidden');
  const [alumnoAsignaturas, setAlumnoAsignaturas] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAlumnos = () => {
    colegioApi
      .get('/alumno')
      .then((response) => {
        setdata(
          response.data.map((item) => ({
            ...item,
            custom: {
              estaMatric: item.matriculado !== 'No',
              id: item.alumno_id,
            },
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      colegioApi
        .get(`/alumno/search/${searchValue}`)
        .then((response) => {
          setdata(
            response.data.map((item) => ({
              ...item,
              custom: {
                estaMatric: item.matriculado !== 'No',
                id: item.alumno_id,
              },
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAlumnos();
    }
  }, [searchValue]);

  const eliminar = useCallback(
    (id) => () => {
      colegioApi
        .delete(`/alumno/${id}`)
        .then((response) => {
          console.log(response.data.mensaje);
          getAlumnos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Alumno',
        accessor: 'nombres',
      },
      {
        Header: 'Documento',
        accessor: 'documento',
      },
      {
        Header: 'Num Documento',
        accessor: 'numero_documento',
      },
      {
        Header: 'Edad',
        accessor: 'edad',
      },
      {
        Header: 'Sexo',
        accessor: 'sexo',
      },
      {
        Header: 'Nivel',
        accessor: 'nivel',
      },
      {
        Header: 'Grado',
        accessor: 'grado',
      },
      {
        Header: 'Modalidad',
        accessor: 'modalidad',
      },
      {
        Header: 'Turno',
        accessor: 'turno',
      },
      {
        Header: 'Estado',
        accessor: 'estado',
      },
      {
        Header: 'Situacion',
        accessor: 'situacion',
      },
      {
        Header: 'Matriculado',
        accessor: 'matriculado',
      },
      {
        Header: '',
        accessor: 'custom',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ value }) => (
          <div className="flex justify-between gap-4">
            <FontAwesomeIcon
              className={`${
                value.estaMatric
                  ? 'text-xl text-blue-500'
                  : 'text-xl text-gray-400'
              }`}
              icon={faClipboardUser}
              onClick={() => {
                if (value.estaMatric) {
                  setTimeout(() => {
                    setOpenInforme('');
                    const alumnoData = data.filter(
                      (el) => el.alumno_id === value.id
                    );
                    setAlumno(alumnoData[0]);

                    if (alumnoData.length === 0) {
                      setTimeout(() => {
                        colegioApi
                          .get(`/alumno`)
                          .then((response) => {
                            const alumnoData = response.data.filter(
                              (el) => el.alumno_id === value.id
                            );
                            console.log('se mando una segunda petición');
                            setAlumno(alumnoData[0]);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }, 1000);
                    }
                  }, 1000);

                  colegioApi
                    .get(`matricula/asignaturas/${value.id}`)
                    .then((response) => {
                      setAlumnoAsignaturas(response.data);
                    })
                    .catch((error) => {
                      console.log(error);
                      setAlumnoAsignaturas(error.response.data);
                    });
                }
              }}
            />
            <Link
              to={`/matricula/${value.id}`}
              className={`${value.estaMatric ? 'pointer-events-none' : ''}   `}
            >
              <FontAwesomeIcon
                className={`text-xl ${
                  value.estaMatric ? 'cursor-not-allowed text-gray-400' : ''
                }   `}
                icon={faGraduationCap}
              />
            </Link>
            <Link to={`/formalumno/${value.id}`}>
              <FontAwesomeIcon
                className="text-xl text-blue-500"
                icon={faPenToSquare}
              />
            </Link>

            <FontAwesomeIcon
              className="cursor-pointer text-xl text-red-500"
              icon={faTrash}
              onClick={eliminar(value.id)}
            />
          </div>
        ),
      },
    ],
    [eliminar]
  );
  const cerrarInforme = () => setOpenInforme('hidden');

  return (
    <div className="w-full space-y-4 border-t border-gray-100 p-10 shadow-xl shadow-slate-400/10">
      <Modal
        open={openInforme}
        setOpen={setOpenInforme}
        cerrar={cerrarInforme}
        abrir={false}
      >
        <div className="flex flex-col justify-center">
          <h3 className="mb-4 rounded-md bg-blue-400 p-5 text-2xl font-bold text-white">
            Informe del alumno {alumno?.nombres}
          </h3>

          <div className="flex flex-col">
            <p>
              <span className="font-bold">Nombre: </span>
              {`${alumno?.nombres ?? '...'}`}
            </p>
            <p>
              <span className="font-bold">Nivel: </span>
              {alumno?.nivel ?? '...'}
            </p>
            <p>
              <span className="font-bold">Grado: </span>
              {alumno?.grado ?? '...'}
            </p>
            <p>
              <span className="font-bold">Estado: </span>
              {alumno?.estado ?? '...'}
            </p>
            <p>
              <span className="font-bold">Turno: </span>
              {alumno?.turno ?? '...'}
            </p>
            <p>
              <span className="font-bold">Modalidad: </span>
              {alumno?.modalidad ?? '...'}
            </p>

            <h3 className="my-4 rounded-md bg-blue-400 p-5 text-2xl font-bold text-white">
              Asignaturas
            </h3>

            <table className="rounded-md">
              <thead>
                {alumnoAsignaturas.length > 1 ? (
                  <tr className=" border bg-indigo-500 text-white">
                    <th>Asignatura</th>
                    <th>Profesor</th>
                  </tr>
                ) : (
                  <tr>
                    <th> {alumnoAsignaturas.errors} </th>
                  </tr>
                )}
              </thead>
              <tbody>
                {Array.isArray(alumnoAsignaturas)
                  ? alumnoAsignaturas?.map(({ asignatura, profesor }) => (
                      <tr
                        key={(asignatura += profesor)}
                        className="mb-7 border text-center text-xs sm:text-base"
                      >
                        <td>{asignatura ?? ' - '}</td>
                        <td>{profesor ?? ' - '}</td>
                      </tr>
                    ))
                  : undefined}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <div className="text-center">
        <FontAwesomeIcon
          className="mb-3 text-5xl text-orange-400"
          icon={faUsersLine}
        />
        <span className="block text-lg font-medium">Lista de Alumnos</span>
      </div>
      <div className="flex w-full justify-end">
        <div className="hover-scale-item flex w-32 cursor-default items-center gap-2 rounded-full bg-gray-100 py-3 px-5 hover:scale-100 md:w-56">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm " />
          <input
            id="search"
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Buscar"
            value={searchValue}
            onChange={({ target }) => {
              const { value } = target;
              setsearchValue(value);
            }}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto border">
        <Table columns={columns} data={data} />
      </div>
      <div className="flex w-full justify-end">
        <Link to="/formalumno">
          <button
            type="submit"
            className="rounded-md bg-[#635DFF] py-1.5 px-10 text-sm text-white"
          >
            Añadir
          </button>
        </Link>
      </div>
    </div>
  );
}
