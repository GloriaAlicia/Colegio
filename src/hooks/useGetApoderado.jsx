import { useState } from 'react';
import colegioApi from '../api/colegioApi';

export const useGetApoderado = () => {
  const [alumnosApoderado, setAlumnosApoderado] = useState([]);

  const getAlumnosDeApoderado = (id) => {
    colegioApi
      .get(`alumno/apoderado/byapoderado/${id}`)
      .then((response) => {
        setAlumnosApoderado(
          response.data.map((item) => ({
            ...item,
            custom: {
              deleteId: item.apoderado_alumno_id,
              id: item.alumnos_id,
            },
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getAlumnosDeApoderado,
    alumnosApoderado,
    setAlumnosApoderado,
  };
};
