import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailValidation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const validationRequested = useRef(false);

  useEffect(() => {
    if (!token) {
      toast.error('No se proporcionó token de validación.', {
        onClose: () => navigate('/'),
        autoClose: 2500,
      });
      return;
    }

    if (!validationRequested.current) {
      validationRequested.current = true;

      const validateEmail = async () => {
        try {
          await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/validate-email/${token}`);
          toast.success('Correo electrónico validado con éxito. Serás redirigido para iniciar sesión.', {
            onClose: () => navigate('/login'),
            autoClose: 2500,
          });
        } catch (error) {
          toast.error('Hubo un problema validando tu correo electrónico.', {
            onClose: () => navigate('/'),
            autoClose: 2500,
          });
        }
      };

      validateEmail();
    }
  }, [navigate, token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Verifying Your Email...
        </h1>
        <p className="mb-4">
          Please wait while we verify your email.
        </p>
      </div>
    </div>
  );
};

export default EmailValidation;
