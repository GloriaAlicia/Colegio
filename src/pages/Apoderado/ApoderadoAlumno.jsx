import {
  faMagnifyingGlass,
  faTrash,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import colegioApi from '../../api/colegioApi';
import { InputCheck } from '../../components/atoms/InputCheck';
import { Modal } from '../../components/Modal';
import Table from '../../components/Table';
import { useAsignarAlumnos } from '../../hooks/useAsignarAlumnos';
import { useGetAlumnos } from '../../hooks/useGetAlumnos';
import { useGetApoderado } from '../../hooks/useGetApoderado';

export default function ApoderadoAlumno() {
  const [searchName, setSearchName] = useState('');
  const [asignar, setAsignar] = useState([]); // id's de alumnos
  const [open, setOpen] = useState('hidden'); // modal/abrir

  const { id } = useParams();
  const { getAlumnosDeApoderado, alumnosApoderado, setAlumnosApoderado } =
    useGetApoderado(); //pantalla
  const { getAlumnos, alumnos, setAlumnos } = useGetAlumnos(); // modal

  useEffect(() => {
    if (searchName.trim().length > 0) {
      colegioApi
        .get(`alumno/search/${searchName}`)
        .then((response) => {
          setAlumnos(
            response.data.map((item) => ({
              ...item,
              custom: {
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
  }, [searchName]);

  const eliminar = useCallback((id) => {
    colegioApi
      .delete(`alumno/apoderado/${id}`)
      .then((response) => {
        console.log(response.data.mensaje);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(asignar);
  }, [asignar]);

  const cerrar = () => {
    setOpen('hidden');
    setAsignar([]);
    getAlumnos();
  };

  const submitAsignar = () => {
    useAsignarAlumnos(id, asignar);
    setTimeout(() => {
      getAlumnosDeApoderado(id);
    }, 1000);
    cerrar();
  };

  useEffect(() => {
    getAlumnos();
    getAlumnosDeApoderado(id);
  }, []);

  const handleChange = (target, idMateria) => {
    if (target.checked) {
      setAsignar((prevState) => {
        return [...prevState, idMateria];
      });
    } else {
      setAsignar((prevState) => {
        const eliminar = prevState.filter((id) => id !== idMateria);
        return eliminar;
      });
    }
  };

  const columnsCustomModal = [
    {
      Header: 'Seleccionar',
      accessor: 'custom',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell: ({ value }) => {
        return (
          <div className="flex justify-between gap-4">
            <InputCheck
              name={value.id}
              onChange={(e) => handleChange(e.target, value.id)}
            />
          </div>
        );
      },
    },
    {
      Header: 'Alumnos',
      accessor: 'nombres',
    },
    {
      Header: 'Documento',
      accessor: 'documento',
    },
    {
      Header: 'N° Documento',
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
      Header: 'Situación',
      accessor: 'situacion',
    },
    {
      Header: 'Matriculado',
      accessor: 'matriculado',
    },
  ];

  //  eliminar, materias dependencias
  const columnsModal = useMemo(() => columnsCustomModal, [eliminar, alumnos]);

  const columnsApoderado = useMemo(
    () => [
      {
        Header: 'Alumnos',
        accessor: 'nombres',
      },
      {
        Header: 'Documento',
        accessor: 'documento',
      },
      {
        Header: 'N° Documento',
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
        Header: 'Situación',
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
        Cell: ({ value }) => {
          return (
            <div className="flex cursor-pointer justify-between gap-4 text-xl text-red-500">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                  eliminar(value.deleteId);
                  setTimeout(() => {
                    getAlumnosDeApoderado(id);
                  }, 1000);
                }}
              />
            </div>
          );
        },
      },
    ],
    [eliminar]
  );

  return (
    <div className="w-full space-y-4 border-t border-gray-100 p-10 shadow-xl shadow-slate-400/10">
      <div className="text-center">
        <FontAwesomeIcon
          className="mb-3 text-5xl text-orange-400"
          icon={faUserGroup}
        />
        <span className="block text-lg font-medium">Apoderado-Alumno</span>
      </div>
      <Modal open={open} setOpen={setOpen} cerrar={cerrar} abrir={true}>
        <div className="flex w-11/12 items-center justify-between">
          <h2 className="text-lg font-medium"> Asociar cursos </h2>

          <div className="hover-scale-item flex w-32 cursor-default items-center gap-2 rounded-full bg-gray-100 py-2 px-5 hover:scale-100 md:w-56">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm " />
            <input
              id="search"
              className="w-full bg-transparent outline-none"
              type="text"
              placeholder="Buscar"
              value={searchName}
              onChange={({ target }) => {
                const { value } = target;
                setSearchName(value);
              }}
            />
          </div>
        </div>

        <div className="my-2 max-h-80 overflow-scroll">
          <Table columns={columnsModal} data={alumnos} />
        </div>

        <div className="flex w-full items-center justify-center">
          <button
            className="rounded-md bg-[#635DFF] py-1.5 px-10 text-center text-sm text-white"
            onClick={submitAsignar}
            disabled={asignar <= 0}
          >
            Guardar
          </button>
        </div>
      </Modal>

      <div className="w-full overflow-x-auto border">
        <Table columns={columnsApoderado} data={alumnosApoderado} />
      </div>

      <div className="flex w-full justify-end">
        <Link to="/apoderado">
          <button
            type="submit"
            className="rounded-md bg-[#635DFF] py-1.5 px-10 text-sm text-white"
          >
            Regresar
          </button>
        </Link>
      </div>
    </div>
  );
}
