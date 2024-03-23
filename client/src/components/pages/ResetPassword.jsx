import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';


const ResetPassword = () => {

  const location = useLocation();
  const {token} = queryString.parse(location.search)
  console.log(token)

    const { password1, password2, changeFormValue} = useForm({
      password1: '',
      password2: '',
    })

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log({
        password1, password2
      })
      if (password1 !== password2) {
        return toast.error('Passwords must be equal.');
        
      }


      try { 
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, { token, password: password1 });
        console.log(response.data);
        toast.success("Reset Password sent")
      } catch (error){
        console.log(error)
      }
      }
  

      return (
        <>
          <ToastContainer />
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full px-8 py-10" style={{ maxWidth: '100%' }}>
              <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
              <p className="text-sm text-gray-600 text-center mb-6">
                Repeat 2 times your Password
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="password" 
                  name="password1" 
                  placeholder="New Password" 
                  value={password1}
                  onChange={changeFormValue} 
                  required 
                  className="block w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="password" 
                  name="password2" 
                  placeholder="Confirm your password" 
                  value={password2}
                  onChange={changeFormValue} 
                  required 
                  className="block w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none"
                >
                  Reset Password
                </button>
              </form>
              <div className="text-center mt-6">
                <a href="/login" className="text-blue-500 text-sm hover:underline">Have an account? Log in</a>
              </div>
            </div>
          </div>
        </>
      );
      }      


export default ResetPassword;
