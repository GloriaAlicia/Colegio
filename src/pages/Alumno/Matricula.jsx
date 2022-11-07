import { faUsersLine } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import warn from '../../assets/warn.svg';

import FormInput from '../../components/FormInput';
import useForm from '../../hooks/useForm';
import colegioApi from '../../api/colegioApi';
import { Modal } from '../../components/Modal';
import { postPDF } from '../../helpers/postPDF';
// import { useGetPDF } from '../../hooks/useGetPDF';

export default function Matricula() {
  const [
    {
      situacionId,
      estadoId,
      nivelId,
      gradoId,
      modalidadId,
      turnoId,
      fechaMatricula,
      periodo,
      seccion,
    },
    onInputChange,
  ] = useForm({
    situacionId: '',
    estadoId: '',
    nivelId: '',
    gradoId: '',
    modalidadId: '',
    turnoId: '',
    fechaMatricula: DateTime.now().toFormat('yyyy-MM-dd'),
    periodo: DateTime.now().year,
    seccion: '',
  });

  const navigate = useNavigate();

  const [isValid, setisValid] = useState(false);

  const [listGrado, setListGrado] = useState([]);
  const [alumno, setAlumno] = useState({});
  const [informe, setInforme] = useState({});

  const { id } = useParams();
  const [open, setOpen] = useState('hidden');
  const [openInforme, setOpenInforme] = useState('hidden');
  const [alumnoAsignaturas, setAlumnoAsignaturas] = useState([]);

  useEffect(() => {
    setisValid(
      situacionId !== '' &&
        estadoId !== '' &&
        nivelId !== '' &&
        gradoId !== '' &&
        modalidadId !== '' &&
        turnoId !== '' &&
        fechaMatricula !== '' &&
        periodo !== '' &&
        seccion !== ''
    );
  }, [
    situacionId,
    estadoId,
    nivelId,
    gradoId,
    modalidadId,
    turnoId,
    periodo,
    fechaMatricula,
    seccion,
  ]);

  useEffect(() => {
    if (nivelId !== '') {
      const grados = [1, 2, 3, 4, 5];
      if (nivelId === 'P') {
        grados.push(6);
      }
      setListGrado(
        grados.map((grado) => ({ id: grado, name: `${grado}° Grado` }))
      );
    }
  }, [nivelId, setListGrado]);

  const matricularAlumno = () => {
    colegioApi
      .post('/matricula', {
        alumno_id: id,
        situacion_id: situacionId,
        estado_id: estadoId,
        nivel_id: nivelId,
        grado_id: gradoId,
        modalidad_id: modalidadId,
        turno_id: turnoId,
        periodo,
        fechaMatricula: DateTime.fromISO(fechaMatricula).toISO(),
        seccion,
      })
      .then(() => {
        navigate('/alumno');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAlumno = (id) => {
    colegioApi
      .get(`alumno/${id}`)
      .then((response) => {
        console.log(response);
        setAlumno(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(informe);
    console.log(alumnoAsignaturas);
  }, [informe]);

  const cerrar = () => setOpen('hidden');
  const cerrarInforme = () => setOpenInforme('hidden');

  return (
    <div className="m-auto my-8 flex w-fit flex-col items-center gap-10 border-t border-gray-100 p-0 sm:p-10 sm:shadow-xl">
      <div className="flex flex-col">
        <FontAwesomeIcon
          className="my-3 text-5xl text-orange-400"
          icon={faUsersLine}
        />
        <span className="text-lg font-medium">Matricula Alumno</span>
      </div>
      <div>
        <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2">
          <FormInput
            id="situacionId"
            description="Situacion"
            placeholder="Seleccione una opción"
            value={situacionId}
            onInputChange={onInputChange}
            selectValues={[
              { id: '1', name: 'Ingresante' },
              { id: '2', name: 'Estudiante' },
            ]}
          />
          <FormInput
            id="estadoId"
            description="Estado"
            placeholder="Seleccione una opción"
            value={estadoId}
            onInputChange={onInputChange}
            selectValues={[
              { id: '1', name: 'Promovido' },
              { id: '2', name: 'Repitente' },
            ]}
          />
          <FormInput
            id="nivelId"
            description="Nivel"
            placeholder="Seleccione una opción"
            value={nivelId}
            onInputChange={onInputChange}
            selectValues={[
              { id: 'P', name: 'Primaria' },
              { id: 'S', name: 'Secundaria' },
            ]}
          />
          <FormInput
            id="gradoId"
            description="Grado"
            placeholder="Seleccione una opción"
            value={gradoId}
            onInputChange={onInputChange}
            selectValues={listGrado}
          />
          <FormInput
            id="seccion"
            description="Seccion"
            placeholder="Seleccione una opción"
            value={seccion}
            onInputChange={onInputChange}
            selectValues={[
              { id: 'A', name: 'A' },
              { id: 'B', name: 'B' },
            ]}
          />
          <FormInput
            id="modalidadId"
            description="Modalidad"
            placeholder="Seleccione una opción"
            value={modalidadId}
            onInputChange={onInputChange}
            selectValues={[
              { id: '1', name: 'Presencial' },
              { id: '2', name: 'Virtual' },
            ]}
          />
          <FormInput
            id="turnoId"
            description="Turno"
            placeholder="Seleccione una opción"
            value={turnoId}
            onInputChange={onInputChange}
            selectValues={[
              { id: '1', name: 'Mañana' },
              { id: '2', name: 'Tarde' },
            ]}
          />
          <div>
            <span className="block text-[0.8rem] text-slate-500">
              Fecha de Matricula
            </span>
            <input
              type="date"
              className="
          mt-0.5
          w-60
          rounded-lg
          border
          border-slate-200
          bg-slate-50
          p-2
          text-sm
          outline-none
        "
              value={fechaMatricula}
              readOnly
            />
          </div>

          <FormInput
            id="periodo"
            description="Periodo"
            placeholder="Seleccione una opción"
            value={periodo}
            onInputChange={onInputChange}
            selectValues={[
              { id: '2022', name: `Ciclo-${DateTime.now().year}` },
              { id: '2023', name: `Ciclo-${DateTime.now().year + 1}` },
            ]}
          />
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} cerrar={cerrar} abrir={false}>
        <div className="flex flex-col items-center justify-center md:flex-row">
          <img
            src={warn}
            alt="alerta de matriculacion"
            className="max-w-xs drop-shadow-md lg:rotate-6"
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex flex-col items-center lg:w-4/5">
              <h3 className="mb-2 gap-3 text-center font-sans text-3xl font-bold text-slate-900">
                ¿Esta seguro de matricularse?
              </h3>
              <p className="lg:text-center">
                Esta acción será irreversible, por lo tanto no podrá eliminar su
                matricula más tarde.
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className={
                  'rounded-md bg-[#635DFF] px-5 py-1 text-lg text-white md:py-1.5 md:px-7'
                }
                onClick={() => {
                  matricularAlumno();
                }}
              >
                Matricularse
              </button>

              <button
                className="rounded-md bg-red-500 px-5 py-1 text-lg text-white md:py-1.5 md:px-7"
                onClick={cerrar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openInforme}
        setOpen={setOpenInforme}
        cerrar={cerrarInforme}
        abrir={false}
      >
        <div className="flex flex-col justify-center">
          <h3 className="mt-7 mb-4 rounded-md bg-blue-400 p-5 text-2xl font-bold text-white">
            Informe del alumno {informe.nombres}
          </h3>

          <div className="flex flex-col">
            <p>
              <span className="font-bold">Nombre: </span>
              {`${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno}` ??
                'nombre'}
            </p>
            <p>
              <span className="font-bold">Nivel: </span>
              {informe.nivel}
            </p>
            <p>
              <span className="font-bold">Grado: </span>
              {informe.grado}
            </p>
            <p>
              <span className="font-bold">Sección: </span>
              {informe.seccion}
            </p>
            <p>
              <span className="font-bold">Turno: </span>
              {informe.turno}
            </p>
            <p>
              <span className="font-bold">Modalidad: </span>
              {informe.modalidad}
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
                        <td>{asignatura}</td>
                        <td>{profesor}</td>
                      </tr>
                    ))
                  : undefined}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-7">
        <button
          type="submit"
          className={
            isValid
              ? 'rounded-md bg-[#635DFF] py-1.5 px-10 text-xs text-white'
              : 'cursor-not-allowed rounded-md bg-gray-500 py-1.5 px-10 text-xs text-gray-300'
          }
          onClick={() => {
            if (isValid) {
              setInforme(
                postPDF({
                  alumno_id: id,
                  nombres: alumno.nombres,
                  nivel: nivelId,
                  grado: gradoId,
                  seccion: seccion,
                  turno: turnoId,
                  modalidad: modalidadId,
                })
              );

              setOpenInforme('');

              colegioApi
                .get(`matricula/asignaturas/${id}`)
                .then((response) => {
                  console.log(response.data.errors);
                  setAlumnoAsignaturas(response.data);
                })
                .catch((error) => {
                  console.log(error);
                  setAlumnoAsignaturas(error.response.data);
                });
              getAlumno(id);
            }
          }}
        >
          Mostrar informe
        </button>

        <button
          type="submit"
          className={
            isValid
              ? 'rounded-md bg-[#635DFF] py-1.5 px-10 text-xs text-white'
              : 'cursor-not-allowed rounded-md bg-gray-500 py-1.5 px-10 text-xs text-gray-300'
          }
          onClick={() => {
            if (isValid) {
              setOpen('');
            }
          }}
        >
          Guardar
        </button>
        <Link to="/alumno" className="p-0">
          <button
            type="submit"
            className="h-full w-full rounded-md bg-red-500 py-1.5  px-10 text-xs text-white"
          >
            Cancelar
          </button>
        </Link>
      </div>
    </div>
  );
}
