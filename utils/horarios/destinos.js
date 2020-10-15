exports.destinos = (origen = 0) => {
  switch (origen) {
    case 'APAT':
      return {
        MORE: 'Morelia',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        COAL: 'Coalcoman',
        TEPA: 'Tepalcatepec',
        BUEN: 'Buenavista',
      };
    case 'CCAM':
      return {
        MORE: 'Morelia',
        APAT: 'Apatzingán',
        URUA: 'Uruapan',
        ARTE: 'Arteaga',
        COAL: 'Coalcoman',
        TEPA: 'Tepalcatepec',
        BUEN: 'Buenavista',
        LCAR: 'Lázaro Cárdenas',
        ZIHU: 'Zihuatanejo',
        IXTA: 'Ixtapa',
      };
    case 'URUA':
      return {
        MORE: 'Morelia',
        APAT: 'Apatzingán',
        CCAM: 'Cuatro Caminos',
        ARTE: 'Arteaga',
        COAL: 'Coalcoman',
        TEPA: 'Tepalcatepec',
        BUEN: 'Buenavista',
        LCAR: 'Lázaro Cárdenas',
        ZIHU: 'Zihuatanejo',
        IXTA: 'Ixtapa',
      };
    case 'ARTE':
      return {
        MORE: 'Morelia',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
      };
    case 'COAL':
      return {
        MORE: 'Morelia',
        APAT: 'Apatzingán',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        ARTE: 'Arteaga',
        COAL: 'Coalcoman',
        TEPA: 'Tepalcatepec',
        BUEN: 'Buenavista',
        LCAR: 'Lázaro Cárdenas',
        ZIHU: 'Zihuatanejo',
        IXTA: 'Ixtapa',
      };
    case 'TEPA':
      return {
        MORE: 'Morelia',
        APAT: 'Apatzingán',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        TEPA: 'Tepalcatepec',
        BUEN: 'Buenavista',
      };
    case 'BUEN':
      return {
        MORE: 'Morelia',
        APAT: 'Apatzingán',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        COAL: 'Coalcoman',
        TEPA: 'Tepalcatepec',
      };
    case 'LCAR':
      return {
        MORE: 'Morelia',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
      };
    case 'ZIHU':
      return {
        MORE: 'Morelia',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        IXTA: 'Ixtapa',
      };
    case 'IXTA':
      return {
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        ZIHU: 'Zihuatanejo',
        MORE: 'Morelia',
      };
    case 'MORE':
      return {
        APAT: 'Apatzingán',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        ARTE: 'Arteaga',
        COAL: 'Coalcoman',
        TEPA: 'Tepalcatepec',
        BUEN: 'Buenavista',
        LCAR: 'Lázaro Cárdenas',
        ZIHU: 'Zihuatanejo',
        IXTA: 'Ixtapa',
      };
    default:
      return {
        MORE: 'Morelia',
        APAT: 'Apatzingán',
        CCAM: 'Cuatro Caminos',
        URUA: 'Uruapan',
        ARTE: 'Arteaga',
        COAL: 'Coalcoman',
        TEPA: 'Tepalcatepec',
        BUEN: 'Buenavista',
        LCAR: 'Lázaro Cárdenas',
        ZIHU: 'Zihuatanejo',
        IXTA: 'Ixtapa',
      };
  }
};

exports.oficinas = (oficina) => {
  switch (oficina) {
    case 'MORE':
      return 'Morelia';
    case 'APAT':
      return 'Apatzingán';
    case 'CCAM':
      return 'Cuatro Caminos';
    case 'URUA':
      return 'Uruapan';
    case 'ARTE':
      return 'Arteaga';
    case 'COAL':
      return 'Coalcomán';
    case 'TEPA':
      return 'Tepalcatepec';
    case 'BUEN':
      return 'Buenavista';
    case 'LCAR':
      return 'Lázaro Cárdenas';
    case 'ZIHU':
      return 'Zihuatanejo';
    case 'IXTA':
      return 'Ixtapa';

    default:
      break;
  }
};

exports.listaDestinos = (senderId) => {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: `
✔ Morelia
✔ Apatzingán
✔ Arteaga
✔ Coalcomán
✔ Cuatro Caminos
✔ Uruapan
✔ Tepalcatepec
✔ Buenavista
✔ Lázaro Cárdenas
✔ Zihuatanejo
✔ Ixtapa
  `,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Inicio',
          payload: 'INICIO_PAYLOAD',
        },
      ],
    },
  };
  return messageData;
};
