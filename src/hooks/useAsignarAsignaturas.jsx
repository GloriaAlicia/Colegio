import colegioApi from '../api/colegioApi';

export const useAsignarAsignatura = (profesorId, materias) => {
  const obj = {};
  const asignar = (profesorId, materiaId) => {
    console.log(profesorId, materiaId);
    colegioApi
      .post(`/profesor/asignatura`, {
        profesor_id: profesorId,
        materia_id: materiaId,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  materias.forEach((materiaId) => {
    asignar(profesorId, materiaId);
  });
};
