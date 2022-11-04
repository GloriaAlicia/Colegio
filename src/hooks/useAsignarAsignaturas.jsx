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

  if (materias > 1) {
    materias.forEach((materiaId) => {
      promises.push(asignar(profesorId, materiaId));
    });

    Promise.allSettled(promises).then((results) =>
      results.forEach((result) => console.log(result.status))
    );
  } else {
    asignar(profesorId, materias[0]);
  }
};
