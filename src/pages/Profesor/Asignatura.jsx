import {
  faMagnifyingGlass,
  faTrash,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import colegioApi from '../../api/colegioApi';
import { InputCheck } from '../../components/atoms/InputCheck';
import { Modal } from '../../components/Modal';
import Table from '../../components/Table';
import { useAsignatura } from '../../hooks/useAsignatura';
import { useAsignarAsignatura } from '../../hooks/useAsignarAsignaturas';

export default function Asignatura() {
  const [data, setdata] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [asignar, setAsignar] = useState([]);

  const { id } = useParams();
  const materias = useAsignatura(id);

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      colegioApi
        .get(`/profesor/search/${searchValue}`)
        .then((response) => {
          setdata(
            response.data.map((item) => ({
              ...item,
              custom: {
                id: item.profesor_id,
              },
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // getProfesores();
    }
  }, [searchValue]);

  const eliminar = useCallback(
    (id) => () => {
      colegioApi
        .delete(`profesor/asignatura/byprofesor/${id}`)
        .then((response) => {
          console.log(response.data.mensaje);
          getProfesores();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const getProfesor = useCallback(
    (id) => () => {
      colegioApi
        .get(`profesor/asignatura/byprofesor/${id}`)
        .then((response) => {
          console.log(response.data.mensaje);
          // getProfesores();
          setdata(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  useEffect(() => {
    console.log(asignar);

    colegioApi
      .get(`profesor/asignatura/byprofesor/${id}`)
      .then((response) => {
        console.log(response.data.mensaje);
        // getProfesores();
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [asignar]);

  const submitAsignar = () => useAsignarAsignatura(id, asignar);

  const handleChange = (target, idMateria) => {
    if (target.checked) {
      setAsignar((prevState) => {
        return [...prevState, idMateria];
      });
      console.log(idMateria, 'true if');
    } else {
      setAsignar((prevState) => {
        const eliminar = prevState.filter((id) => id !== idMateria);
        return eliminar;
      });
      console.log('else');
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Seleccionar',
        accessor: 'custom',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ value }) => {
          return (
            <div className="flex justify-between gap-4">
              <label htmlFor={value.htmlId}>asignar</label>
              <InputCheck
                name={value.htmlId}
                onChange={(e) => handleChange(e.target, value.id)}
              />
            </div>
          );
        },
      },
      {
        Header: 'Cursos',
        accessor: 'asignatura',
      },
      {
        Header: 'Seccion',
        accessor: 'seccion',
      },
      {
        Header: 'Turno',
        accessor: 'turno',
      },
      {
        Header: 'Nivel',
        accessor: 'nivel',
      },
      {
        Header: 'Grado',
        accessor: 'grado',
      },
    ],
    [eliminar]
  );

  const columnsProfesor = useMemo(
    () => [
      {
        Header: 'Cursos',
        accessor: 'asignatura',
      },
      {
        Header: 'Seccion',
        accessor: 'seccion',
      },
      {
        Header: 'Turno',
        accessor: 'turno',
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
        Header: '',
        accessor: 'custom',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ value }) => {
          return (
            <div className="flex justify-between gap-4">
              <FontAwesomeIcon icon={faTrash} />
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
          icon={faBookOpenReader}
        />
        <span className="block text-lg font-medium">Profesor-Asignatura</span>
      </div>
      <Modal>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium"> Asociar cursos </h2>

          <div className="hover-scale-item flex w-32 cursor-default items-center gap-2 rounded-full bg-gray-100 py-2 px-5 hover:scale-100 md:w-56">
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

        <div className="my-2 max-h-80 overflow-scroll">
          <Table columns={columns} data={materias} />
        </div>

        <div className="flex w-full items-center justify-center">
          <button
            className="rounded-md bg-[#635DFF] py-1.5 px-10 text-center text-sm text-white"
            onClick={submitAsignar}
            disabled={asignar < 1}
          >
            Asignar
          </button>
        </div>
      </Modal>

      <div className="w-full overflow-x-auto border">
        <Table columns={columnsProfesor} data={data} />
      </div>

      <div className="flex w-full justify-end">
        <Link to="/formprofesor">
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
