import { useEffect, useMemo, useState } from 'react';
import colegioApi from '../api/colegioApi';

export const useAsignatura = () => {
  const [materias, setMaterias] = useState([]);

  const getMaterias = () => {
    colegioApi
      .get(`/profesor/asignatura/free`)
      .then((response) => {
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

  return {
    getMaterias,
    materias,
    setMaterias,
  };
};
