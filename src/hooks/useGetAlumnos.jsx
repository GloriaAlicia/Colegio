import { useState } from 'react';
import colegioApi from '../api/colegioApi';

export const useGetAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);

  const getAlumnos = () => {
    colegioApi
      .get(`alumno`)
      .then((response) => {
        console.log(response);
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
  };

  return {
    getAlumnos,
    alumnos,
    setAlumnos,
  };
};
