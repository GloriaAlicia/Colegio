import colegioApi from '../api/colegioApi';

export const useAsignarAsignatura = (profesorId, materias) => {
  const promises = [];
  const asignar = (profesorId, materiaId) => {
    colegioApi
      .post(`/profesor/asignatura`, {
        profesor_id: profesorId,
        asignatura_id: materiaId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(materias);

  if (materias.length > 1) {
    materias.forEach((materiaId) => {
      promises.push(asignar(profesorId, materiaId));
    });

    Promise.allSettled(promises).then((results) =>
      results.forEach((result) => console.log(result.status))
    );

    console.log('mayor a 1');
  } else if (materias.length === 1) {
    asignar(profesorId, materias[0]);
    console.log('es solo 1');
  } else {
    console.log('hay', materias.length);
  }
};
