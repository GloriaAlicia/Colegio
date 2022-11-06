import colegioApi from '../api/colegioApi';

export const useAsignarAlumnos = (apoderadoId, alumnos) => {
  const promises = [];
  const asignar = (apoderadoId, alumnoId) => {
    colegioApi
      .post(`/alumno/apoderado`, {
        apoderado_id: apoderadoId,
        alumno_id: alumnoId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(alumnos);

  if (alumnos.length > 1) {
    alumnos.forEach((alumnoId) => {
      promises.push(asignar(apoderadoId, alumnoId));
    });

    Promise.allSettled(promises).then((results) =>
      results.forEach((result) => console.log(result.status))
    );
  } else if (alumnos.length === 1) {
    asignar(apoderadoId, alumnos[0]);
  } else {
    return;
  }
};
