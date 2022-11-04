import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import colegioApi from '../api/colegioApi';

export const useAsignatura = (id) => {
  const [data, setDataProfesor] = useState([]);
  const [materias, setMaterias] = useState([]);

  const getMaterias = () => {
    colegioApi
      .get(`/profesor/asignatura/free`)
      .then((response) => {
        // console.log(response.data);
        setMaterias(
          response.data.map((item) => ({
            ...item,
            custom: {
              id: item.asignatura_id,
              htmlId: (item.asignatura += item.asignatura_id),
            },
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfesores = () => {
    colegioApi
      .get(`/profesor/asignatura/byprofesor/${id}`)
      .then((response) => {
        // console.log(response.data);
        setDataProfesor(
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
  };

  useEffect(() => {
    getProfesores();
    getMaterias();
    materiasLibres();
  }, []);

  const materiasLibres = () => {
    materias?.map((materia) => {
      // console.log(materia.asignatura_id);
    });
  };

  return materias;
};
