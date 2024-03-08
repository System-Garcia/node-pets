import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const EmailValidation = () => {
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    const validateEmail = async () => {
      try {
        await axios.get(`http://localhost:3000/api/auth/validate-email/${token}`);
        alert('Correo electrónico validado con éxito. Ahora puedes iniciar sesión.');
        history.push('/login');
      } catch (error) {
        console.error(error.response ? error.response.data : error);
        alert('Hubo un problema validando tu correo electrónico.');
      }
    };

    if (token) {
      validateEmail();
    }
  }, [token, history]);

};
