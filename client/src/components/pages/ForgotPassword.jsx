import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { formValue, changeFormValue } = useForm({ email: '' });
  const { email } = formValue;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, { email });
      console.log(response.data);
      toast.success("Email Sent, reset your password and then just log in", {
        onClose: () => navigate('/login'),
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Error sending email.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-auto bg-white">
          <div className="py-12 px-6 text-center">
            <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
            <p className="text-sm text-gray-600 mb-8">
              Water is life. Water is a basic human need. In various times of life, humans need water.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={email}
                onChange={changeFormValue}
                required 
                className="block w-full px-4 py-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                className="block w-full bg-blue-500 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-600 focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Next'}
              </button>
            </form>
            <div className="mt-8">
              <p className="text-sm text-center text-gray-600">
                Have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
