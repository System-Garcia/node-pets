import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmailValidation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const validateEmail = async () => {
      if (!token) return;

      try {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/validate-email/${token}`);
        alert('Correo electrónico validado con éxito. Ahora puedes iniciar sesión.');
      } catch (error) {
        console.error(error.response ? error.response.data : error);
        alert('Hubo un problema validando tu correo electrónico.');
      }
    };

    validateEmail();
  }, [token]);

  return (
    <>
      <Link to="/login">Todo salio correctamente, ahora solo queda que hagas un Login</Link>
    </>
  );
};

export default EmailValidation;
  