export const postPDF = (obj) => {
  if (obj.nivel === 'P') {
    obj.nivel = 'Primaria';
  } else {
    obj.nivel = 'Secundaria';
  }

  if (obj.modalidad === '1') {
    obj.modalidad = 'Presencial';
  } else {
    obj.modalidad = 'Virtual';
  }

  if (obj.turno === '1') {
    obj.turno = 'Mañana';
  } else {
    obj.turno = 'Tarde';
  }
  return obj;
  // colegioApi
  //   .post(`matricula/export-to-pdf`, {
  //     alumno_id: obj.alumno_id,
  //     nombres: obj.nombres,
  //     nivel: obj.nivel,
  //     grado: obj.grado,
  //     seccion: obj.seccion,
  //     turno: obj.turno,
  //     modalidad: obj.modalidad,
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
