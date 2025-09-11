import axios from 'axios';

const API_URL = 'http://localhost:10000/api/orders'; // Cambiá si usás otro puerto/backend

const testOrdenSinToken = async () => {
  try {
    const res = await axios.post(API_URL, {
      name: 'Invitado',
      dni: '00000000',
      address: 'Sin dirección',
      city: 'Ninguna',
      postalCode: '0000',
      phone: '000',
      paymentMethod: 'efectivo',
      items: [{ id: 'id-del-producto', quantity: 1 }],
    });

    console.log('ERROR: Se creó la orden sin token. Respuesta:');
    console.log(res.data);
  } catch (error: any) {
    if (error.response) {
      console.log('Protegido correctamente. Respuesta del servidor:');
      console.log('Código:', error.response.status);
      console.log('Mensaje:', error.response.data.message);
    } else {
      console.log('Error en la conexión:', error.message);
    }
  }
};

testOrdenSinToken();
