exports.reloj = (hora) => {
  // hora = new Date().setHours(hora.split(':')[0], hora.split(':')[1]);
};

exports.servicio = (servicio) => {
  switch (servicio) {
    case 'EX':
      return 'Express';
    case 'CP':
      return 'Ultra';
    case 'PL':
      return 'Platinum';
    case 'BC':
      return 'Business';

    default:
      return '';
      break;
  }
};

exports.colorServicio = (servicio) => {
  switch (servicio) {
    case 'EX':
      return '🟥';
    case 'CP':
      return '🟪';
    case 'PL':
      return '⬜';
    case 'BC':
      return '🟧';

    default:
      return '🟥';
  }
};
